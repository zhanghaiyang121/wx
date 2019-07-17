const Koa = require('koa')
const { resolve } = require('path')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const mongoose = require('mongoose')
const moment = require('moment')
const Router = require('koa-router')
const config = require('./config/config')
const { initSchemas, connect } = require('./database/init')

;(async () => {
  await connect(config.db)

  initSchemas()
  // 生成服务器实例
  const app = new Koa()
  const router = new Router()
  // const views = require('koa-views')

  // Must be used before any router is used
  // app.use(views(resolve(__dirname, './views'), {
  //   extension: 'pug',
  //   options: {
  //     moment: moment
  //   }
  // }))

  app.use(bodyParser())
  
  app.use(serve(resolve(__dirname, './public')))
  app.use(serve(resolve(__dirname, './app/dist'),{ extensions: ['html']}));

  require('./config/routes')(router)

  app.use(router.routes()).use(router.allowedMethods())

  app.listen(config.port)
  console.log('Listen: ' + config.port)
})()
