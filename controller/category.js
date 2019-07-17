
const mongoose = require('mongoose')
const Category = mongoose.model('Category')
// 2. 电影分类的创建持久化
exports.new = async (ctx, next) => {
    const { name, _id } = ctx.request.body
    let category
  
    if (_id) {
      category = await Category.findOne({_id})
    }
  
    if (category) {
      category.name = name
    } else {
      category = new Category({ name })
    }
  
    const data=await category.save()
  
    ctx.body=data
  }

  
  exports.list = async (ctx, next) => {
    const data = await Category.find({})
    ctx.body=data
  }

  exports.show = async (ctx, next) => {
    let {_id}=ctx.request.body
    const data = await Category.find({_id})
    ctx.body=data
  }

  exports.del = async (ctx, next) => {
    let {_id}=ctx.request.body
    const data=await Category.remove({ _id })
    // await Movie.remove({category: _id})
    ctx.body=data
  }