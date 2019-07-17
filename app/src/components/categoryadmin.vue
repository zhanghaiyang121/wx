<template>
    <div class="content">
       <headerpage></headerpage>
       <div class="content">
           <div class="container">
               <div class="row">
                   <div class="form-group">
                       <label class="col-sm-10" for="inputCat">电影分类</label>
                       <div class="col-sm-10">
                           <input id="inputCat" class="form-control" type="text" v-model="name">
                       </div>
                   </div>
                   <div class="form-group">
                       <div class="col-sm-offset-2 col-sm-10">
                           <button class="btn btn-default" @click="addcategory">录入</button>
                       </div>
                   </div>
               </div>
           </div>
       </div>
    </div>
</template>

<script>
import headerpage from "../common/header"
import axios from 'axios'
import {api} from '../config'
import {newcategory,categorybyid} from "../api/category"
    export default {
        components:{
            headerpage
        },
        data(){
            return{
                name:'',
                id:''
            }
        },
        methods: {
            async addcategory(){
                let name=this.name
                let id=this.id
                const data=await newcategory(name,id)
                this.$router.push("/categorylist")
            },
            async showcategory(id){
                const data=await categorybyid(id)
                this.id=data.data[0]._id
                this.name=data.data[0].name
            }
        },
        mounted() {
            if(this.$route.query){
                this.showcategory(this.$route.query.id)
            }
        },
    }
</script>

<style  scoped>

</style>