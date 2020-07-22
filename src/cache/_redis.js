/**
 *@description 连接 redis 的方法 get set
 * @author coderl
 */

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// 创建 redis 连接客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.error(err)
})

/**
 * set 函数
 * @param {string} key 键
 * @param {string} val 值
 * @param {number} timeout  过期时间 s
 */
function set(key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}

/**
 * get 函数
 * @param {string} key 键
 * @returns {Promise<unknown>}
 */
function get(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
        return
      }
      try {
        resolve(
          JSON.parse(val)
        )
      } catch (e) {
        resolve(val)
      }
    })
  })
}

module.exports = {
  set,
  get
}