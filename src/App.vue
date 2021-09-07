<template>
    <div id="app">
        
        <router-view class="router-view" :style="rvStyle"></router-view>

        <van-tabbar v-show="show" route fixed :z-index="1000" active-color="#0089dc" inactive-color="#8e8e93">
            <van-tabbar-item v-for="(item, index) in items" :key="index" :to="item.path">
                <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? item.icon.active : item.icon.normal"
                >
                <span>{{item.title}}</span>
            </van-tabbar-item>
        </van-tabbar>

    </div>
</template>

<script>

export default {
    name:'app',
    data(){
        return {
            show:true,
            rvStyle:{
                margin: '0 0 50px 0',
            },
            items:[
                {
                    title:"首页",
                    path:"/",
                    icon:{
                        normal:require('./assets/images/icons/home.png'),
                        active:require('./assets/images/icons/home-h.png')
                    },
                },
                {
                    title:"发现",
                    path:"/find",
                    icon:{
                        normal:require('./assets/images/icons/find.png'),
                        active:require('./assets/images/icons/find-h.png')
                    },
                },
                {
                    title:"订单",
                    path:"/order",
                    icon:{
                        normal:require('./assets/images/icons/order.png'),
                        active:require('./assets/images/icons/order-h.png')
                    },
                },
                {
                    title:"我的",
                    path:"/my",
                    icon:{
                        normal:require('./assets/images/icons/my.png'),
                        active:require('./assets/images/icons/my-h.png')
                    },
                },
            ],
        }
    },
    watch: {
        $route(to){
            let toLevel = to.path.split("/").length;
            if(toLevel==2){
                this.show = true;
                this.rvStyle.margin = "0 0 50px 0";
            }else{
                this.show = false;
                this.rvStyle.margin = 0;
            }
            if (to.path.startsWith('/address')) {
                this.rvStyle.margin = "50px 0 50px 0";
                this.show = true;
            }
        }
    },
}
</script>

<style lang="less">
.router-view{
    width: 100%;
    margin-bottom: 50px;
}
</style>
