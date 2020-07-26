/**
 * @description utils api 路由
 */

const router = require('koa-router')()
const koaForm = require('formidable-upload-koa')
const { loginCheck } = require('../../midlleware/loginChecks')
const { saveFile } = require('../../controller/utils')


router.prefix('/api/utils')

const options = {
  uploadDir: `${__dirname}/`,
  keepExtensions: true
}

// 上传图片
router.post('/upload', loginCheck , koaForm(options), async (ctx, next) => {
  const file = ctx.req.files['file']
  const { size, path, name, type } = file
  console.log(file)
  ctx.body = await saveFile({
    name,
    type,
    size,
    filePath: path
  })
})


module.exports = router