<template>
    <div class="login">
        <div  v-if="user" class="login-info" key="login">
            <img :src="user.avatar | isImgHash" class="avatar">
            <div class="title">
                <strong>{{user.username}}</strong>
                <div class="tip">
                    <van-icon name="phone-o"></van-icon>
                    {{user.mobile.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2")}}
                </div>
            </div>
        </div>
        <div v-else class="login-info" key="logout">
            <img :src="avatar" alt="" class="avatar">
            <div class="title">
                <strong>登录/注册</strong>
                <div class="tip"><van-icon name="phone-o"></van-icon>登录后享受更过特权</div>
            </div>
        </div>
        <van-icon name="arrow"></van-icon>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    data() {
        return {
            avatar:require('@/assets/images/avatar-holder.png'),
        }
    },
    computed: {
        ...mapGetters(['user']),
    },

}
</script>

<style scoped>
.login{
    background-color: rgb(0, 150, 255);
    width: 100%;
    height: 9rem;
    padding: 2rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
}
.login-info{
    display: flex;
    align-items: center;
}
.login-info .avatar{
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
}
.login-info .title{
    font-size: 2rem;
    margin-left: 1rem;
}
.login-info .tip{
    font-size: 1rem;
    margin-top: 0.5rem;
}

</style>