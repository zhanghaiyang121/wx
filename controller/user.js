const mongoose = require('mongoose')
const User = mongoose.model('User')
exports.signin = async(ctx,next)=>{
    let {email,password}=ctx.request.body
    const user=await User.findOne({email})
    const isMatch = await user.comparePassword(password, user.password)
    console.log(isMatch)
    ctx.body=user
}

exports.signup = async(ctx,next)=>{
    console.log(ctx.request.body)
    const {email,nickname,password,role}=ctx.request.body
    const user=new User({
      email,
      nickname,
      password,
      role
    })
    const users=await user.save()
    
    ctx.body=users
  }

exports.list = async (ctx, next) => {
const users = await User.find({}).sort('meta.updatedAt')

ctx.body=users
}

exports.del = async (ctx, next) => {
    const {id}=ctx.request.body
    await User.remove({ _id: id })
    ctx.body = { success: true }
}