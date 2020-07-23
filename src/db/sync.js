/**
 * @description sequelize同步
 * @author coderljp
 */

const seq = require('./seq')

require('./model/index')

// 测试连接
// seq.authenticate().then(() => {
//   console.log('auth ok')
// }).catch(() => {
//   console.log('auth err')
// })

seq.sync({ force: false }).then(() => {
  console.log('sync ok')
  process.exit()
})