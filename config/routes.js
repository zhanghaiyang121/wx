const mongoose=require('mongoose')
const User=mongoose.model('User')
const user=require('../controller/user')
const movie=require('../controller/movie')
const category=require('../controller/category')
const koaBody = require('koa-body')
const wechat=require('../wechat-lib/middleware');
const config=require('./config')
module.exports = router => {
  // 登录
  router.post('/signup',user.signup)
  router.post('/signin',user.signin)
  // 后台的用户列表页面
  router.get('/admin/user/list',user.list)
  router.post('/admin/deleteuser',user.del)
  // 后台的分类管理页面
  router.post('/admin/category',category.new)
  router.get('/admin/category/list',category.list)
  router.post('/admin/category/show',category.show)
  router.post('/admin/category/del',category.del)
  // 后台的电影管理页面
  router.post('/admin/movie',koaBody({ multipart: true }),movie.savePoster,movie.new)
  router.get('/admin/movie/list',movie.list)
  router.post("/movie/detail",movie.findone)
  router.post('/admin/movie/del', movie.del)
}
