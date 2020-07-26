/**
 * @description utils controller
 */

const path = require('path')
const fs = require('fs')
const MIX_SIZE = 1024 * 1024 * 10
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  uploadFileSizeFailInfo
} = require('../model/ErrorInfo')
const fse = require('fs-extra')

/**
 * 存储文件
 * @param name
 * @param type
 * @param size
 * @param filePath
 * @returns {Promise<ErrorModel>}
 */
async function saveFile({ name, type, size, filePath }) {
  if (size > MIX_SIZE) {
    await fse.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }

  // 移动文件
  const fileName = Date.now() + '.' + name
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
  await fse.move(filePath, distFilePath)

  // 返回信息
  return new SuccessModel({
    url: '/' + fileName
  })
}

module.exports = {
  saveFile
}