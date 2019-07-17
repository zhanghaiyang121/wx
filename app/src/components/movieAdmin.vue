<template>
<div class="content">
    <div class="container">
        <div class="row">
            <div class="form-horizontal" >
                <div class="form-group">
                    <label class="col-md-10 control-label" for="inputCategory">电影分类</label>
                    <div class="col-md-10">
                        <div v-for="(item,index) in categorys" :key="index">
                            {{item.name}}
                            <input  type='radio' name='categoryId'  @change="getvalue(item)">
                        </div>
                        
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-10 control-label" for="inputmoviename">电影名字</label>
                    <div class="col-md-10">
                        <input  id="inputmoviename" name="inputmoviename" class="form-control" type="text" v-model="inputmoviename">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-10 control-label" for="inputdoctor">电影导演</label>
                    <div class="col-md-10">
                        <input  id="inputdoctor" name="inputdoctor" class="form-control" type="text" v-model="inputdoctor">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-10 control-label" for="inputcountry">国家</label>
                    <div class="col-md-10">
                        <input  id="inputcountry" name="inputcountry" class="form-control" type="text" v-model="inputcountry">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-10 control-label" for="inputlan">语种</label>
                    <div class="col-md-10">
                        <input  id="inputlan" name="inputlan" class="form-control" type="text" v-model="inputlan">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-10 control-label" for="inputpicpath">海报地址</label>
                    <div class="col-md-10">
                        <input  id="inputpicpath" name="inputpicpath" class="form-control" type="text" v-model="inputpicpath">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-10 control-label" for="inputpicpush">海报上传</label>
                    <div class="col-md-10">
                        <input id="upload" @change="change($event)"  name="uploadPoster" type="file"/>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-10 control-label" for="inputyear">上映年代</label>
                    <div class="col-md-10">
                        <input  id="inputyear" name="inputyear" class="form-control" type="text" v-model="inputyear">
                    </div>
                </div>
                <button @click="submit">提交</button>
            </div>
        </div>
    </div>
</div>
    
</template>

<script>
import axios from 'axios'
import {movieadmin} from "../api/movie"
import {categorylist} from "../api/category"
    export default {
        data(){
            return{
                file:'',
                email:'',
                inputmoviename:'阿凡达',
                inputdoctor:'斯皮尔伯格',
                inputcountry:'美国',
                inputlan:'英语',
                inputpicpath:'https://img3.doubanio.com/view/photo/l/public/p2561172733.webp',
                inputyear:'2017',
                inputSummary:'这是一个简洁',
                formdata:{},
                categoryId:'',
                categorys:[]
            }
        },
        methods: {
            change(event){
                console.log(1)
                this.formdata = new FormData();
                this.formdata.append('uploadPoster', document.getElementById("upload").files[0]);
            },
            async submit(){
                let _this=this
                this.formdata.append('title', this.inputmoviename);
                this.formdata.append('director', this.inputdoctor);
                this.formdata.append('country', this.inputcountry);
                this.formdata.append('language', this.inputlan);
                this.formdata.append('poster', this.inputpicpath);
                this.formdata.append('year', this.inputyear);
                this.formdata.append('summary', this.inputSummary);
                this.formdata.append('name', this.name);
                this.formdata.append('category', this.categoryId);
                console.log(this.formdata)
                const result=await movieadmin(this.formdata)
                _this.$router.push("/")
            },
            async fetchCategorys(){
                const data=await categorylist()
                this.categorys=data.data
            },
            getvalue(item){
                console.log(event)
                this.categoryId=item._id
                this.name=item.name
            }
        },
        mounted() {
            this.fetchCategorys()
        },
    }
</script>

<style scoped>

</style>