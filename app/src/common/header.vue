<template>
    <div>
        <header style='background: #343a40;'>
            <div class="container">
                <div class="navbar navbar-dark">
                    <div class="navbar-brand" @click="toindex">时光的余热</div>
                    <form method='GET' action='/results'>
                        <div class="input-group">
                            <input class="form-control" type="text" v-model="name">
                            <span class="input-group-btn" style='margin-left: 10px;'></span>
                            <button @click="search" class="btn btn-default">搜索</button>
                        </div>
                    </form>
                    <p v-if="user.nickname" class="navbar-text navbar-right" style='padding-bottom: 0;'>
                        <span>欢迎您{{user.nickname}}</span>
                        <span>&nbsp|&nbsp</span>
                        <a class="navbar-link">登出</a>
                    </p>
                    <p v-else class="navbar-text navbar-right" style='padding-bottom: 0;'>
                        <a class="navbar-link" href="#" data-toggle="modal"  data-target="#signupModal">注册</a>
                        <span>&nbsp|&nbsp</span>
                        <a class="navbar-link" href="#" data-toggle="modal"  data-target="#signinModal">登录</a>
                        <span>&nbsp|&nbsp</span>
                        <span class="navbar-link" @click="enter">录入</span>
                        <span>&nbsp|&nbsp</span>
                        <span class="navbar-link" @click="admin">列表</span>
                    </p>
                </div>
            </div>
        </header>
        <div id="signupModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form>
                        <div class="modal-header">注册</div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="signupEmail">用户邮箱</label>
                                <input id="signupEmail" class="form-control" v-model="email" type="text">
                            </div>
                            <div class="form-group">
                                <label for="signupNickname">用户昵称</label>
                                <input id="signupNickname" class="form-control" v-model="nickname" type="text">
                            </div>
                            <div class="form-group">
                                <label for="signupPassword">密码</label>
                                <input id="signupPassword" class="form-control" v-model="password" type="text">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-default" data-dismiss="modal" type="button">关闭</button>
                            <button class="btn btn-success" @click="signup" data-dismiss="modal" type="button">提交</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div id="signinModal" class="modal fade" ref="signinModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form>
                        <div class="modal-header">登录</div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="signupEmail">用户邮箱</label>
                                <input id="signupEmail" class="form-control" v-model="email" type="text">
                            </div>
                            <div class="form-group">
                                <label for="signupPassword">密码</label>
                                <input id="signupPassword" class="form-control" v-model="password" type="text">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-default" data-dismiss="modal" type="button">关闭</button>
                            <button class="btn btn-success" @click="signin" data-dismiss="modal" type="button">提交</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {signup,signin} from "../api/user"
    export default {
        data() {
            return {
                name:'',
                user:{
                    nickname:null
                },
                email:"",
                nickname:'',
                password:'',
            }
        },
        methods: {
            toindex(){
                this.$router.push('/')
            },
            async signup(){
               let params={
                    email:this.email,
                    nickname:this.nickname,
                    password:this.password,
                    role:'admin'
                }
               const results=await signup(params)
               console.log(results)
            },
            async signin(){
                let params={
                    email:this.email,
                    password:this.password
                }
               const results=await signin(params)
               this.user.nickname=results.data.nickname
               console.log(this.user)
               console.log(results)
            },
            search(){

            },
            enter(){
                this.$router.push("/movieAdmin")
            },
            admin(){
                this.$router.push("/movielist")
            }
        },
    }
</script>

<style scoped>

</style>