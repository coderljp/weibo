/**
 * @description user controller
 * @author coderl
 */

const { getUserInfo, createUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  registerUserNameNotExistInfo,
  registerFailInfo,
  loginFailInfo
} = require('../model/ErrorInfo')
const { doCrypto } = require('../utils/crpy')

/**
 * @description 用户名是否存在
 * @param userName
 * @returns {Promise<void>}
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

/**
 * 注册
 * @param userName
 * @param password
 * @param gender
 * @returns {Promise<void>}
 */
async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return  new ErrorModel(registerUserNameNotExistInfo)
  }

  // service 注册
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(registerFailInfo)
  }
}

/**
 * 登录
 * @param ctx
 * @param userName
 * @param password
 * @returns {Promise<void>}
 */
async function login(ctx, userName, password) {
  // 登录成功后 ctx.session.userInfo = xxx
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
    // 登录失败
    return new ErrorModel(loginFailInfo)
  }
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}
module.exports = {
  isExist,
  register,
  login
}