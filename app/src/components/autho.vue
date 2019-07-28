<template>
    <div>

    </div>
</template>

<script>
import {api} from '../config'
import {autho} from "../api/sdk"
    export default {
        methods: {
            async getinfo(){
                location.href="http://wechat10day.vipgz1.idcfengye.com/test"
                // const data=await autho()
            }
        },
        mounted() {
            this.getinfo()
        },
    }
</script>

<style scoped>

</style>