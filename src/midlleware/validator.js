/**
 * @description 验证中间件
 */

/**
 * 生成 json schema 验证的中间件
 * @param validateFn
 * @returns {validator}
 */

const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')

function genValidator(validateFn) {
  async function validator(ctx, next) {
    const data = ctx.request.body
    const error = validateFn(data)
    if (error) {
      ctx.body = new ErrorModel(jsonSchemaFileInfo)
      return
    }
    await next()
  }
  return validator
}

module.exports = {
  genValidator
}