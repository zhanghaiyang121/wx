<template>
    <div>
        <headerpage></headerpage>
        <div class="content">
            <div class="row">
                <div class="col-md-7 col-sm-12">
                    <img :src="movie.poster" width="100%" alt="">
                </div>
                <div class="col-md-5">
                    <div class="dl-horizontal">
                        <dt>电影名字</dt>
                        <dd>{{movie.title}}</dd>
                        <dt>导演</dt>
                        <dd>{{movie.director}}</dd>
                        <dt>国家</dt>
                        <dd>{{movie.country}}</dd>
                        <dt>上映年份</dt>
                        <dd>{{movie.year}}</dd>
                        <dt>简介</dt>
                        <dd>{{movie.summary}}</dd>
                    </div>
                    <dir class="panel-heading">
                        <h4>评论区</h4>
                    </dir>
                    <div class="panel-body">
                        <ul class="media-list" style='padding-left: 0'>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {moviedetail} from "../api/movie"
import headerpage from "../common/header"
import {api} from '../config'
    export default {
        components:{
            headerpage
        },
        data() {
            return {
                id:'',
                movie:{}
            }
        },
        methods: {
            async fetchdetail(id){
                const data=await moviedetail(id)
                data.data.poster=api.imgbase+'/upload/'+data.data.poster
                this.movie=data.data
            }
        },
        mounted() {
            this.id=this.$route.query.id
            this.fetchdetail(this.id)
        },
    }
</script>

<style  scoped>

</style>