<template>
    <div class="content">
       <headerpage></headerpage>
       <div class="content">
           <div class="container">
               <div class="row">
                   <table class="table table-hover table-bordered">
                       <thead>
                           <tr>
                                <th> 类别</th>
                                <th> 名字</th>
                                <th> 海报</th>
                                <th> 导演</th>
                                <th> 国家</th>
                                <th> 上映</th>
                                <th> 浏览量</th>
                                <th> 录入时间</th>
                                <th> 修改</th>
                                <th> 详情页</th>
                                <th> 删除</th>
                           </tr>
                       </thead>
                       <tbody v-if="moviearr.length!=0">
                           <tr v-for="(item,index) in moviearr" :key="index">
                                <th> {{item.category?item.category.name:'类别'}}</th>
                                <th> {{item.title}}</th>
                                <th> <img :src="item.poster" width="100" height="150" alt=""></th>
                                <th> {{item.director}}</th>
                                <th> {{item.country}}</th>
                                <th> {{item.year}}</th>
                                <th> {{item.pv}}</th>
                                <th> 录入时间</th>
                                <th> 修改</th>
                                <th> 详情页</th>
                                <th @click="del(item._id,index)"> 删除</th>
                           </tr>
                       </tbody>
                   </table>
               </div>
           </div>
       </div>
    </div>
</template>

<script>
import headerpage from "../common/header"
import axios from 'axios'
import {api} from '../config'
import {movielist,moviedel} from "../api/movie"
    export default {
        components:{
            headerpage
        },
        data() {
            return {
                poster:'',
                moviearr:[]
            }
        },
        methods: {
            async fetchlist(){
                let _this=this
                const result=await movielist()
                let moviearr=result.data
                for(let i=0;i<moviearr.length;i++){
                    moviearr[i].poster=api.imgbase+'/upload/'+moviearr[i].poster
                }
                this.moviearr=moviearr
            },
            async del(id,index){
                const data=await moviedel(id)
                this.moviearr.splice(index,1)
                console.log(data)
            }
        },
        created() {
            this.fetchlist()
        },
        mounted() {
            
        },
    }
</script>

<style  scoped>

</style>