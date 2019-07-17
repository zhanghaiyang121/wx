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
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-success" @click="signin">提交</button>
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
import {signin} from "../api/user"
    export default {
        components:{
            headerpage
        },
        data(){
            return{
                email:'',
                password:''
            }
        },
        methods: {
            async signin(){
                let params={
                    email:this.email,
                    password:this.password
                }
               const results=await signin(params)
               if(results.statusText=='OK'){
                   this.$router.push('/')
               }
               console.log(results)
            },
        },
    }
</script>

<style scoped>

</style>