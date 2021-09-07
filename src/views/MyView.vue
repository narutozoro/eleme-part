<template>
    <div class="home">
        <router-link to="/my/login">
            <my-login></my-login>
        </router-link>

        <van-button v-if="isLogin" type="primary" size="large" @click="mylogout">退出登录</van-button>

    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import MyLogin from '../components/my/MyLogin';
export default {
    name:'MyView',
    components:{
        MyLogin
    },
    computed: {
        ...mapGetters(['isLogin']),
    },
    methods: {
        ...mapActions(['logout']),
        async mylogout(){
            await this.logout();
            this.$router.push('/my/login');
        },
    },
    
}
</script>



<style>


</style>