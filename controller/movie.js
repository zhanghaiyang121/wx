const { readFile, writeFile } = require('fs')
const mongoose = require('mongoose')
const { resolve } = require('path')
const _ = require('lodash')
const util=require('util')
const readFileAsync = util.promisify(readFile)
const writeFileAsync = util.promisify(writeFile)
const Movie = mongoose.model('Movie')
exports.savePoster = async (ctx, next) => {
    const posterData = ctx.request.body.files.uploadPoster
    
    const filePath = posterData.path
    const fileName = posterData.name
  
    if (fileName) {
      const data = await readFileAsync(filePath)
      const timestamp = Date.now()
      const type = posterData.type.split('/')[1]
      const poster = timestamp + '.' + type
      const newPath = resolve(__dirname, '../', 'public/upload/' + poster)
  
      await writeFileAsync(newPath, data)
      console.log(data)
      ctx.poster = poster
    }
    
    await next()
  }

  exports.new = async (ctx, next) => {
    let movieData=ctx.request.body.fields
    if (ctx.poster) {
      movieData.poster = ctx.poster
    }
    movie = new Movie(movieData)
    console.log(movieData)
    const data1=await movie.save()
    ctx.body=data1
  }

  // 3. 电影的后台列表
exports.list = async (ctx, next) => {
  const data = await Movie.find({}).populate('category', 'name')
  ctx.body=data
}

exports.findone = async (ctx, next) => {
  let {_id}=ctx.request.body
  const data = await Movie.findOne({_id})
  ctx.body=data
}

exports.del = async (ctx, next) => {
  let {id}=ctx.request.body
  const data=await Movie.remove({ _id: id })
  ctx.body=data
}