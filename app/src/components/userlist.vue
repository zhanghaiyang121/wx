<template>
    <div class="content">
        <div class="container">
            <div class="row">
                <table class="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>昵称</th>
                            <th>邮箱</th>
                            <th>身份</th>
                            <th>删除</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in userlist" :key="index" >
                            <th>{{item.nickname}}</th>
                            <th>{{item.email}}</th>
                            <th>{{item.role}}</th>
                            <th>
                                <button @click="deleteuser(item,index)" class='btn btn-danger del'>删除</button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import {list,deleteuser} from "../api/user"
    export default {
        data(){
            return{
                userlist:[]
            }
        },
        methods: {
            async list(){
                const users=await list()
                console.log(users)
                this.userlist=users.data
            },
            async deleteuser(item,index){
                const result=await deleteuser(item._id)
                console.log(result.data.success)
                if(result.data.success){
                    this.userlist.splice(index,1)
                    console.log(this.userlist)
                }
            }
        },  
        mounted() {
            this.list()
        },
    }
</script>

<style scoped>

</style>