/**
 *@description 数据库配置
 * @author coderljp
 */

const { isProd } = require('../utils/env')

let REDIS_CONF = {
  host: '127.0.0.1',
  port: '6379'
}

let MYSQL_CONF = {
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: '10271027',
  database: 'koa2-weibo-db'
}

if (isProd) {
  REDIS_CONF = {
    host: '127.0.0.1',
    port: '6379'
  }

  MYSQL_CONF = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '10271027',
    database: 'koa2-weibo-db'
  }
}



module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}