/**
 * @description user service
 * @author coderl
 */

const { User } = require('../db/model/index')
const { formatUser } = require('../services/_format')

/**
 * 获取用户信息
 * @param {string} userName
 * @param {string} password
 * @returns {Promise<void>}
 */
async function getUserInfo(userName, password) {
  // 查询条件
  const whereOpt = {
    userName
  }
  if (password) {
    Object.assign(whereOpt, {password})
  }

  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  })

  if (result == null) {
    // 未找到
    return result
  }

  return formatUser(result.dataValues)
}

module.exports = {
  getUserInfo
}