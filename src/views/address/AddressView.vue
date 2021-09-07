<template>
    <div class="home-address">
        <!-- 导航 -->
        <van-nav-bar
            class="nav-bar"
            title="选择收货地址"
            left-arrow
            fixed
            @click-left="$router.back()"
        />
        <!-- 搜索地址 -->
        <div class="search-address">
            <router-link  class="address" to="/address/city">
                <span class="city">{{selectCity ? selectCity : '请选择...'}}</span>
                <van-icon name="arrow-down" />
            </router-link>
            <van-field
                class="search"
                v-model="keyword"
                clearable
                left-icon="search"
                placeholder="请输入地址"
                @input="searchNearbyClick"
            />
        </div>

        <!-- 重新定位当前地址 -->
        <van-cell-group v-if="!nearbyAddressList && userAddressList" class="current-position" title="当前地址">
            <strong class="position">{{addressInfo ? addressInfo.address : position}}</strong>
            <span class="position-btn">
                <van-icon  slot="right-icon" name="replay" />
                重新定位
            </span>
        </van-cell-group>

        <!-- 用户收货地址列表 -->
        <van-cell-group v-if="!nearbyAddressList && userAddressList" class="=user-address-list" title="收货地址">
            <van-cell 
                v-for="(address, index) in userAddressList" :key="index"
                :label="address.address" >
                <template slot="title">
                    <strong class="custom-title">{{address.name}}</strong>
                    <span>{{address.sex ? '先生' : '女士'}} {{address.phone}}</span>
                </template>
            </van-cell>
        </van-cell-group>


        <!-- 附近地址列表的展示 -->
        <van-cell 
            v-for="(address, index) in nearbyAddressList" :key="index"
            :title="address.name" 
            :value="address.distance" 
            size="large" 
            :label="address.address" 
            @click="addressClick(address)"
        />

    </div>
</template>

<script>
import { mapGetters,mapActions,mapMutations } from 'vuex';
export default {
    name:'AddressView',
    data() {
        return {
            keyword:'',
        }
    },
    computed: {
        ...mapGetters(['isLogin','userAddressList','addressInfo','selectCity','nearbyAddressList']),
    },
    methods: {
        ...mapMutations(['SET_NEATBY_ADDRESS_LIST']),
        ...mapActions(['getNearbyAddressList','getAddress','getUserAddressList']),
        // 根据关键字搜索附近
        searchNearbyClick(){
            this.getNearbyAddressList(this.keyword);
        },
        // 附近地址列表点击
        async addressClick(address){
            await this.getAddress({lat:address.latitude,lng:address.longitude});
            this.$router.push('/');
            // 清空附近列表
            this.SET_NEATBY_ADDRESS_LIST([]);
        }
    },
    created() {
        // 获取用户的收货地址
        if(this.isLogin) this.getUserAddressList();
    },
 
}
</script>

<style lang="less">
.home-address{
    background-color: #eee;
}
// 搜索地址
.search-address{
    width: 100%;
    height: 4rem;
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    background-color: #fff;
    .address{
        width: 6rem;
        display: flex;
        align-items: center;
    }
    .city{
        display: inline-block;
        max-width: 4rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .search{
        padding: 0 0.5rem;
        background-color: #eee;
        line-height: 2rem;
        height: 3rem;
        padding: 0.5rem 1rem;
    }
}
// 当前位置
.current-position{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    .position{
        width: 20rem;
        height: 4.4rem;
        line-height: 4.4rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.2rem;
    }
    .position-btn{
        width: 10rem;
        height: 4.4rem;
        line-height: 4.4rem;
        font-size: 1.4rem;
        color: #2395ff;
        text-align: right;
    }
}

</style>