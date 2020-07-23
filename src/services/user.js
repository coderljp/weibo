/**
 * @description user service
 * @author coderl
 */

const { User } = require('../db/model/index')
const { formatUser } = require('../services/_format')
const { DEFAULT_PICTURE } = require('../conf/constent')

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

/**
 *  创建用户
 * @param {string} userName
 * @param {string} password
 * @param {string} gender
 * @param {string} nickName
 * @returns {Promise<void>}
 */
async function createUser({ userName, password, gender = 3, nickName }) {
  const result = User.create({
    userName,
    password,
    nickName: nickName ? nickName : userName,
    gender
  })
  console.log(result.dataValues)
  return result.dataValues
}

module.exports = {
  getUserInfo,
  createUser
}