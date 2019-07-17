<template>
    <div class="content">
        <headerpage></headerpage>
        <div class="content">
            <div class="container">
                <div class="row">
                    <div class="col-md-5">
                        <div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label for="signupEmail">用户邮箱</label>
                                    <input id="signupEmail" class="form-control" type="text" v-model="email">
                                </div>
                                <div class="form-group">
                                    <label for="signupPassword">密码</label>
                                    <input id="signupPassword" class="form-control" type="text" v-model="password">
                                </div>
                                <div class="form-group">
                                    <label for="signupNickname">密码</label>
                                    <input id="signupNickname" class="form-control" type="text" v-model="nickname">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-success" @click="signup">提交</button>
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
import {signup} from "../api/user"
    export default {
        components:{
            headerpage
        },
        data(){
            return{
                email:'',
                password:'',
                nickname:''
            }
        },
        methods: {
            async signup(){
               let params={
                    email:this.email,
                    nickname:this.nickname,
                    password:this.password,
                    role:'admin'
                }
               const results=await signup(params)
               console.log(results)
               if(results.statusText=="OK"){
                   this.$router.push('/')
               }
            },
        },
    }
</script>

<style scoped>

</style>