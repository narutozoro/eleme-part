<template>
    <div class="home">
        <!-- 头部地址 -->
        <div class="header">
            <router-link to="/address">
                <div class="address">
                    <van-icon  class="location" name="location-o" />
                    <strong class="position" v-if="position_status == 'loading'">正在获取位置</strong>
                    <strong class="position" v-if="position_status == 'fail'">获取位置失败</strong>
                    <strong class="position" v-if="position_status == 'success'">{{addressInfo && addressInfo.address}}</strong>
                    <van-icon name="arrow-down" />
                </div>
            </router-link>
        </div>

        <!-- 头部搜索 -->
        <div class="search">
            <router-link class="btn" to="/">
                <i class="el-icon-search"></i>
                <span>搜索饿了么商家、商品名称</span>
            </router-link>
        </div>

        <main v-show="position_status == 'success'">
            <!-- 轮播图 -->
            <home-swipe :items="catelist"></home-swipe>
            <!-- 品质推荐 -->
            <div class="recommend">
                <div class="info">
                    <div class="title">
                        <h3>品质套餐</h3>
                        <div>搭配齐全吃得好</div>
                        <div class="btn">立即抢购 &gt;</div>
                    </div>
                    <img src="https://cube.elemecdn.com/e/ee/df43e7e53f6e1346c3fda0609f1d3png.png" alt="">
                </div>
            </div>
            <!-- 推荐商家 -->
            <div class="recommend-title">
                推荐商家
            </div>
            <!-- 排序筛选 -->
            <div class="sort" >
                <span class="sort-sort active">综合排序 <i class="el-icon-caret-bottom"></i></span>
                <span class="sort-distance">距离最近</span>
                <span class="sort-sort">品质联盟</span>
                <span class="sort-sort">筛选 <i class="el-icon-coin"></i></span>
            </div>
            <!-- 未登录 -->
            <div v-if="!isLogin" class="home-logout">
                <van-image width="16rem" src="https://fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png"></van-image>
                <h3>没有结果</h3>
                <p>登录后查看更多商家</p>
                <van-button type="primary" to="/my/login">登录</van-button>
            </div>
        </main>

        <div v-if="position_status == 'loading'" class="loading">
            <van-loading  color="#1989fa"  />
        </div>

        <div v-if="position_status == 'fail'" class="fail">
            <van-image
                width="16rem"
                height="16rem"
                src="https://fuss10.elemecdn.com/2/67/64f199059800f254c47e16495442bgif.gif"
            />
            <p>输入地址后才能订餐哦！</p>
            <van-button type="primary" to="/address">手动选择地址</van-button>
        </div>

    </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
import HomeSwipe from '../components/home/HomeSwipe';

export default {
    name:'HomeView',
    components:{HomeSwipe},
    computed: {
        ...mapGetters(['addressInfo','catelist','isLogin','position_status']),
    },
    created(){
        if (this.position_status == 'loading') {
            this.getGolocation();
        }
    },
    methods: {
        ...mapActions(['getGolocation']),
    },
   
}
</script>

<style lang='less'>
/* 头部地址 */
.header{
    width: 100%;
    height: 4rem;
    padding: 1.6rem 1rem 0.4rem 1rem;
    background-color: rgb(0, 150, 255);
    .address{
        width: 60vw;
        height: 100%;
        color: white;
        display: flex;
        align-items: center;
    }
    .location{
        font-size: 1.5rem;
    }
    .position{
        display: inline-block;
        height: 100%;
        max-width: calc(100% - 4rem);
        margin-left: 0.2rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 1.4rem;
    }
}
/* 搜索 */
.search{
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100%;
    height: 4.4rem;
    background-color: rgb(0, 150, 255);
    text-align: center;
    padding:  0.6rem 1rem;
    .btn{
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        color: #999;
    }
}
/* 品质推荐 */
.recommend{
    width: 100%;
    height: 10rem;
    padding: 0 1rem 1rem 1rem;
    .info{
        background-color: #eee;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
    }
    img{
        width: 12rem;
        height: 8rem;
    }
    .title{
        padding-left: 1rem;
        padding-top: 1rem;
    }
    .title h3{
        font-size: 1.4rem;
    }
    .btn{
        color: #af8260;
        font-weight: 700;
        margin: 0.5rem 0;
    }
}

/* 推荐分类 */
.recommend-title{
    width: 100%;
    height: 3rem;
    font-size: 1.2rem;  
    line-height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    &::before{
        content: '';
        display: inline-block;
        height: 1px;
        width: 2rem;
        background-color: #999;
        margin-right: 0.5rem;
    }
    &::after{
        content: '';
        display: inline-block;
        height: 1px;
        width: 2rem;
        background-color: #999;
        margin-left: 0.5rem;
    }
}

/* 筛选 */
.sort{
    width: 100%;
    height: 3.2rem;
    display: flex;
    position: sticky;
    top: 4.4rem;
    z-index: 1000;
    background-color: #fff;
    &>span{
        flex-grow: 1;
        text-align: center;
        line-height: 3.2rem;
        font-size: 1.2rem;
    }
    .active{
        font-weight: 700;
    }
}
/* 未登录 */
.home-logout{
    text-align: center;
}
.loading{
    text-align: center;
    line-height: 20rem;
}
.fail{
    text-align: center;
}

</style>