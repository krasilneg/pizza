<?php

namespace pizza;

use DateInterval;
use DateTime;
use stdClass;
use wooo\core\PasswordHash;
use wooo\core\Request;
use wooo\core\Response;
use wooo\core\Token;
use wooo\lib\dbal\PDODriver;

class Authenticator
{

  private $db;

  public function __construct(PDODriver $db)
  {
    $this->db = $db;
  }

  public function check(string $uid, Request $req, Response $res)
  {
    if (empty($req->getHeader('auth-token'))) {
      return $res->setStatus(401)->send('Invalid token');
    }
    $now = new DateTime();
    $u = $this->db->get(
      'select * from user where uid = :uid and token = :token and token_exp > :exp',
      [
        'uid' => $uid,
        'token' => $req->getHeader('auth-token'),
        'exp' => $now
      ]
    );
    if (!$u) {
      return $res->setStatus(401)->send('Invalid token');
    }
    return $u;
  }

  public function login(string $uid, string $pwd, Response $res): object
  {
    $ph = new PasswordHash();
    $exp = new DateTime();
    $exp->add(new DateInterval('PT24H'));
    $token = new Token();
    $token = bin2hex($token->value());

    $u = $this->db->get('select * from user where uid = :uid', ['uid' => $uid]);
    if ($u) {
      if (!$ph->check($pwd, $u->pwd)) {
        return $res->setStatus(403)->send('Invalid password');
      }
      $this->db->execute(
        'update user set token = :token, token_exp = :exp where uid = :uid',
        [
          'uid' => $uid,
          'token' => $token,
          'exp' => $exp          
        ]
      );
      $u->token = $token;
    } else {
      if (!filter_var($uid, FILTER_VALIDATE_EMAIL)) {
        return $res->setStatus(400)->send('Invalid user email specified');
      }
      $this->db->execute(
        'insert into user (uid, pwd, token, token_exp) values (:uid, :pwd, :token, :exp)',
        [
          'uid' => $uid,
          'pwd' => $ph->apply($pwd),
          'token' => $token,
          'exp' => $exp
        ]
      );
      $u = new stdClass();
      $u->uid = $uid;
      $u->token = $token;
      $u->address = '';
      $u->phone = '';
    }
    return $u;
  }
}