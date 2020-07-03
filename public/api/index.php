<?php
error_reporting(E_ALL);

$config = include '../../config/config.php';
$config = array_merge($config, $_ENV);

$di = include '../../config/di.php';
require '../../vendor/autoload.php';

use pizza\Authenticator;
use pizza\OrderStatus;
use wooo\core\App;
use wooo\core\Config;
use wooo\core\DateTime;
use wooo\core\Request;
use wooo\core\Response;
use wooo\lib\dbal\PDODriver;
use wooo\lib\middleware\GlobalTransaction;

(
  new App(
    realpath(__DIR__ . '/../..'),
    new Config($config),
    $di
  )
)
    ->get('/api/showcase$', function (PDODriver $db) use ($config) {
      return [
        'menu' => $db->query('select * from menu'),
        'delivery' => [
          'usd' => $config['delivery']['usd'] ?? 0,
          'euro' => $config['delivery']['euro'] ?? 0
        ]
      ];
    })
    ->use(GlobalTransaction::handler())
    ->post('/api/login$', function (Request $req, Response $res, Authenticator $auth, PDODriver $db) {
      $credentials = $req->getBody();
      $u = null;
      if (!empty($credentials->pwd) && !empty($credentials->uid)) {
        $u = $auth->login($credentials->uid, $credentials->pwd, $res);
      } else if (!empty($credentials->uid)) {
        $u = $auth->check($credentials->uid, $req, $res);
      } else {
        return $res->setStatus(400)->send('Bad request');
      }

      $orders = $db->query('select * from orders where uid = :uid', ['uid' => $u->uid], ['status' => 'int', 'when' => 'datetime']);
      foreach ($orders as &$order) {
        $order->contacts = json_decode($order->contacts);
        $order->items = json_decode($order->items);
        /*
        $pids = [];
        foreach ($order->items as &$item) {
          $pids[$item->id] = $item;
        }
        $products = $db->query('select * from menu where id in (' . implode(',', array_keys($pids)) . ')');
        foreach ($products as $p) {
          $pids[$p->id]->item = $p;
        }
        */
      }

      return [
        'uid' => $u->uid,
        'token' => $u->token,
        'phone' => $u->phone,
        'address' => $u->address,
        'orders' => $orders
      ];
    })
    ->post('/api/profile', function (Request $req, Response $res, PDODriver $db, Authenticator $auth) {
      $profile = $req->getBody();
      if (empty($profile->uid)) {
        $res->setStatus(400)->send('Bad request');
      }
      if (!empty($profile->phone)) {
        if (preg_match('/^\d{11}$/', $profile->phone) !== 1) {
          throw new Exception('Invalid phone number format');
        }
      }
      $auth->check($profile->uid, $req, $res);
      $db->execute(
        'update user set phone = :phone, address = :address where uid = :uid',
        [
          'uid' => $profile->uid,
          'phone' => $profile->phone,
          'address' => $profile->address
        ]
      );
      return 'done';
    })
    ->post('/api/order$', function (Request $req, Response $res, PDODriver $db, Authenticator $auth) {
      $order = $req->getBody();

      if (
        empty($order->items) ||
        !is_array($order->items) ||
        empty($order->contacts) ||
        empty($order->contacts->phone) ||
        empty($order->contacts->address)
      ) {
        return $res->setStatus(400)->send('Bad request');
      }

      if (!empty($order->uid)) {
        $auth->check($order->uid, $req, $res);
      }

      if (empty($order->uid) && empty($order->contatcs->email) && empty($order->contacts->phone)) {
        throw new Exception('No customer identity specified!');
      }

      if (empty($order->uid) && isset($order->contacts->email) && !filter_var($order->contacts->email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email specified!');
      }

      $out = [];
      $when = new DateTime();
      $db->execute(
        'insert into orders (uid, `when`, contacts, items, status) values (:uid, :when, :contacts, :items, :status)',
        [
          'uid' => $order->uid ?? null,
          'when' => $when,
          'contacts' => json_encode($order->contacts),
          'items' => json_encode($order->items),
          'status' => OrderStatus::PENDING
        ],
        $out
      );
      $result = new stdClass();
      $result->id = $out['rowid'];
      $result->uid = $order->uid ?? null;
      $result->when = $when;
      $result->contacts = $order->contacts;
      $result->items = $order->items;
      $result->status = OrderStatus::PENDING;
      return $result;
    })
    ->post('/api/cancel', function (Request $req, Response $res, PDODriver $db, Authenticator $auth) {
      $order = $req->getBody();
      if (empty($order->uid) || empty($order->id)) {
        $res->setStatus(400)->send('Bad request');
      }
      $auth->check($order->uid, $req, $res);
      $status = $db->scalar('select status from orders where id = :id and uid = :uid', ['id' => $order->id, 'uid' => $order->uid]);
      if (!$status) {
        return $res->setStatus(404)->send('Order not found');
      }

      if ($status != OrderStatus::PENDING) {
        return $res->setStatus(405)->send('Order is already in process');
      }

      $db->execute('delete from orders where id = :id and uid = :uid', ['id' => $order->id, 'uid' => $order->uid]);
      return 'done';
    })
    ->notFound();