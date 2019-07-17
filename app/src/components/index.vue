<template>
  <div>
    <headerpage></headerpage>
    <div class="content">
      <div class="container">
        <div class="panel" style="margin: 18px 0;" >
          <div class="panel-heading">
            <h3>科幻</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3"  v-for="(item,index) in moviearr" :key="index" @click="detail(item)">
            <div class="card" style='height: 410px;margin-bottom: 18px;'> 
              <div style='display: block;height: 340px;overflow: hidden;'>
                <img width="100%" :src="item.poster" alt="">
              </div>
              <div class="card-body">
                <p class="card-text">
                  <a href="#">{{item.title}}</a>
                </p>
              </div>
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
import {movielist} from "../api/movie"
export default {
  name: 'index',
  components:{
    headerpage
  },
  data () {
    return {
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
    detail(item){
      this.$router.push('/detail?id='+item._id)
    }
  },
  mounted() {
    this.fetchlist()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn{
  border-radius: 10px;
  font-size: 16px;
  padding: 10px 50px;
  margin: 5px 0;
  width: 100%;
  border: 1px solid white;
  outline: none;
  background: -webkit-gradient(linear, left top, left bottom, from(#faa51a), to(#f47a20));
}
</style>
