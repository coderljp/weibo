/**
 * @description 博客数据类型
 */

const seq = require('../seq')
const { INTEGER, STRING, TEXT } = require('../types')

const Blog = seq.define('blog', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 ID'
  },
  comment: {
    type: TEXT,
    allowNull: false,
    comment: '微博内容'
  },
  image: {
    type: STRING,
    comment: '图片地址'
  }
})

module.exports = {
  Blog
}