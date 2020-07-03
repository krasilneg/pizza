<?php

return [
  'db' => [
    'class' => 'wooo\lib\dbal\PDODriver',
    'args' => ['${DB_URI}', '${DB_USER}', '${DB_PWD}'],
    'options' => [
      'connectionOptions' => [
        'ATTR_TIMEOUT' => 30,
        'MYSQL_ATTR_USE_BUFFERED_QUERY' => true,
        'MYSQL_ATTR_FOUND_ROWS' => true
      ]
    ]
  ],
  'tm' => [
    'class' => 'wooo\lib\transactions\TransactionManager',
    'options' => [
      'manage' => 'db'
    ]      
  ]
];
