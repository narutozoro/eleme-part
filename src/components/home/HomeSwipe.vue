<template>
    <div class="swipe-box">
        <van-swipe class="swipe" :autoplay="0" indicator-color="red" @change="swipeChange">
            <van-swipe-item  v-for="(item, index) in items" :key="index" class="swipe-item">
                <div class="item" v-for="(cate, index) in item" :key="index">
                    <van-image 
                        class="item-pic" 
                        :src="cate.image_hash | isImgHash"
                        width="4rem"
                        height="4rem"
                    ></van-image>
                    <p class="item-name">{{cate.name}}</p>
                </div>
            </van-swipe-item>
            <!-- 自定义指示灯 -->
            <div class="indicator" slot="indicator">
                <div
                    v-for="(item, index) in items"
                    :key="index"
                    class="indicator-item"
                    :class="{active:current==index}"
                >
                </div>
            </div>
        </van-swipe>
    </div>
</template>

<script>
export default {
    props:['items'],
    data() {
        return {
            current:0,
        }
    },
    methods: {
        swipeChange(index){
            this.current = index;
        }
    },
}
</script>

<style scoped>
.swipe{
    width: 100%;
    height: 14.8rem;
}
.swipe-item{
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    text-align: center;
}
.item{
    width: calc(100% / 5);
    height: 6.4rem;
}
.indicator{
    width: 100%;
    height: 0.1rem;
    display: flex;
    justify-content: center;
    position: relative;
    top: -1rem;
}
.indicator-item{
    width: 1rem;
    height: 100%;
    background-color: #ccc;
    margin: 0 0.2rem;
}
.active{
    background-color: #fe7100;
}
</style>