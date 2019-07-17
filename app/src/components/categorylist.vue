<template>
    <div>
        <headerpage></headerpage>
        <div class="content">
            <div class="container">
                <div class="row">
                    <table class="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>名称</th>
                                <th>更新时间</th>
                                <th>修改</th>
                                <th>删除</th>
                            </tr>
                            <tr v-for="(item,index) in categorys" :key="index">
                                <th>{{item.name}}</th>
                                <th>更新时间</th>
                                <th @click="update(item)">修改</th>
                                <th @click="del(item,index)">删除</th>
                            </tr>
                        </thead>
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
import {categorylist,categorydel} from "../api/category"
    export default {
        components:{
            headerpage
        },
        data(){
            return{
                categorys:[]
            }
        },
        methods: {
            async fetchCategorys(){
                const data=await categorylist()
                this.categorys=data.data
            },
            update(item){
                let url='/categoryadmin?id='+item._id
                this.$router.push(url)
            },
            async del(item,index){
                const data=await categorydel(item._id)
                this.categorys.splice(index,1)
            }
        },
        mounted() {
            this.fetchCategorys()
        },
    }
</script>

<style  scoped>

</style>