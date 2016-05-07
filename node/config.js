/**
 * Created by YikaJ on 15/11/18.
 */
'use strict';

module.exports = {
  port: 3333,
  db: {
    mongodb: "mongodb://localhost/Rloud",
    database: "Rloud",
    server: "localhost"
  },
  session: {
    secret: "Rloud means Realtime Cloud",
    options: {
      port: "6379",
      host: "127.0.0.1",
      ttl: 60 * 30  //Session的有效期为半小时
    }
  },
  error: {
    code: {
      2: '账号或密码有误',
      3: 'session服务器有误'
    }
  }
};