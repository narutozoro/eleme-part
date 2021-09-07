<template>
    <div class="city">
        <!-- 导航 -->
        <van-nav-bar
            class="nav-bar"
            title="城市选择"
            left-arrow
            fixed
            :z-index="2"
            @click-left="$router.back()"
        />

        <van-index-bar :index-list="citys.alphabet" :sticky-offset-top="44" sticky>
            <template v-for="(alpha,index) in citys.alphabet">
                <van-index-anchor :key="alpha" :index="alpha" />
                <van-cell 
                    v-for="city in citys.cityList[index].cities" 
                    :key="city.name"
                    :title="city.name" 
                    to="/address" 
                    @click="cityClick(city)"
                    />
            </template>
        </van-index-bar>

    </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex';
export default {
    name:'CitiyView',
    computed: {
        ...mapGetters(['citys']),
    },
    methods: {
        ...mapActions(['getAddress']),
        cityClick(city){
            this.getAddress({lat:city.latitude,lng:city.longitude});
            console.log(city);
        }
    },
}
</script>

<style lang="less">
.city{
    background-color: #eee;
}
</style>