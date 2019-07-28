const Koa = require('koa')
const { resolve } = require('path')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const mongoose = require('mongoose')
const moment = require('moment')
const Router = require('koa-router')
const config = require('./config/config')
const fs = require('fs');
const wechat=require('./wechat-lib/middleware');
const WechatOAuth=require('./wechat-lib/autho');
const wechatlib=require('./wechat-lib');
const views = require('koa-views')

const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { REDIS_CONF } = require('./config/db')
const { initSchemas, connect } = require('./database/init')

;(async () => {
  await connect(config.db)

  initSchemas()
  // 生成服务器实例
  const app = new Koa()
  const router = new Router()
  const views = require('koa-views')

  // Must be used before any router is used
  app.use(views(resolve(__dirname, './views'), {
    extension: 'pug',
    options: {
      moment: moment
    }
  }))
  app.use(bodyParser())
  
  app.use(serve(resolve(__dirname, './public')))
  app.use(serve(resolve(__dirname, './app/dist'),{ extensions: ['html']}));
  app.keys = ['WJiol#23123_']
  app.use(session({
    // 配置 cookie
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24*60*60*5000
    },
    // 配置 redis
    store: redisStore({
      // all: '127.0.0.1:6379'   // 写死本地的 redis
      // all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
      all:'127.0.0.1:6379'
    })
  }))

  router.post("/",wechat(config.wechat))
  router.get('/li', async(ctx,next)=>{
    console.log(2)
    const oauth=new WechatOAuth(config.wechat)
    console.log(ctx.query)
    const result=await oauth.fetchAccessToken(ctx.query.code)
    const info=await oauth.getUserInfo(result.access_token, result.openid, 'zh_CN')
    console.log(info)
    // ctx.session.str =JSON.stringify(info)
    // if(!ctx.session.username){
    //   ctx.session.username = '123'
    // }
    let infostr=JSON.stringify(info)
    console.log(typeof infostr)
    ctx.cookies.set('info',info.openid);
    ctx.redirect('http://wechat10day.vipgz1.idcfengye.com/')
})

router.get('/test', async(ctx,next)=>{
  console.log(ctx.cookies.get('koa.sid'))
    // if(ctx.session.username){
    //   ctx.redirect('http://wechat10day.vipgz1.idcfengye.com')
    // }else{
      console.log('test')
      // console.log(ctx.session.username)
      console.log(1)
      const oauth=new WechatOAuth(config.wechat)
      let url1='http://wechat10day.vipgz1.idcfengye.com/li'
      const url=oauth.getAuthorizeURL('snsapi_base',url1,'a')
      console.log(url)
      ctx.url=url
      ctx.redirect(url)
    // }
    
})

  router.post('/jdk', async(ctx,next)=>{
    console.log(1)
    const wechat=new wechatlib(config.wechat)
    const token=await wechat.fetchAccessToken()
    const Data=await wechat.fetchTicket(token.access_token)
    const {sign}=require('./wechat-lib/util')
    // let url='http://wechat10day.vipgz1.idcfengye.com'+ctx.req.url
    let {url}=ctx.request.body
    // console.log(ctx.req)
    console.log(url)
    const params=sign(Data.ticket,url)
    params.appId=config.wechat.appID
    ctx.body=params
    // await ctx.render('wechat/sdk', params)
  })

  router.get('/jdk', async(ctx,next)=>{
    console.log(1)
    const wechat=new wechatlib(config.wechat)
    const token=await wechat.fetchAccessToken()
    const Data=await wechat.fetchTicket(token.access_token)
    const {sign}=require('./wechat-lib/util')
    let url='http://wechat10day.vipgz1.idcfengye.com'+ctx.req.url
    // let {url}=ctx.request.body
    // console.log(ctx.req)
    console.log(url)
    const params=sign(Data.ticket,url)
    params.appId=config.wechat.appID
    // ctx.body=params
    await ctx.render('wechat/sdk', params)
  })
  
  require('./config/routes')(router)
  
  app.use(router.routes()).use(router.allowedMethods())

  app.listen(config.port)
  console.log('Listen: ' + config.port)
})()
