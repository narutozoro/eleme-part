<template>
    <div>
        <van-nav-bar
            class="nav-bar"
            title="添加地址"
            left-text="返回"
            left-arrow
            fixed
            @click-left="$router.back()"
        />
        新增地址
    </div>
</template>

<script>
export default {
    name:'AddressAddView',
    methods: {
        
    },
}
</script>

<style scoped>
    
</style>