import { $get } from '@/config/http/http';
import { getUrl } from '@/config/http/url';
import city from '@/assets/data/city_list';

export default {
    state: {
        latitude: 0, //纬度
        longitude: 0, //经度
        position_status: sessionStorage.getItem('position_status') ? sessionStorage.getItem('position_status') : 'loading',
        addressInfo:sessionStorage.getItem('addressInfo') ? JSON.parse(sessionStorage.getItem('addressInfo')) : null,//请求的地址
        nearbyAddressList:null,//附近位置列表
        selectCity:'',//用户手动选择的城市
        
        userAddressList:null,//用户收货地址列表
        citys:city,
        
    },
    getters: {
        latitude: state => state.addressInfo ? state.addressInfo.latitude : state.latitude,
        longitude: state => state.addressInfo ? state.addressInfo.longitude : state.longitude,
        position_status: state => state.position_status,
        addressInfo: state => state.addressInfo,
        nearbyAddressList: state => state.nearbyAddressList,
        selectCity: state => state.addressInfo ? state.addressInfo.city : '',

        userAddressList: state => state.userAddressList,
        citys: state => state.citys,
    },
    mutations: {
        SET_LAT_LNG(state, {lat,lng}) {
            state.latitude = lat;
            state.longitude = lng;
        },
        SET_POSITION_STATUS(state,data){
            state.position_status = data;
        },
        SET_ADDRESS_INFO(state,data){
            state.addressInfo = data;
            state.position_status = 'success';
            sessionStorage.setItem('addressInfo',JSON.stringify(data));
            sessionStorage.setItem('position_status','success');
        },
        SET_NEATBY_ADDRESS_LIST(state, list){
            state.nearbyAddressList = list;
        },
        SET_USER_ADDRESS_List(state, list) {
            state.userAddressList = list;
        },
        SET_SELECT_CITY(state, city){
            state.selectCity = city;
        },
    },
    actions: {
        // 定位：获取经纬度
        getGolocation({commit, dispatch}){
            if (!navigator.geolocation) {
                commit('SET_POSITION_STATUS', 'fail');
                return;
            }
            navigator.geolocation.getCurrentPosition(pos=>{
                commit('SET_LAT_LNG',{lat:pos.coords.latitude, lng:pos.coords.longitude});
                // 获取位置信息
                dispatch('getAddress',{lat:pos.coords.latitude, lng:pos.coords.longitude});
            }, ()=>{
                commit('SET_POSITION_STATUS', 'fail')
            },{timeout:1000});
        },
        // 获取位置信息：根据经纬度
        async getAddress({commit},{lat,lng}){
            let res = await $get(getUrl.address,{
                latitude:lat,
                longitude:lng,
            });
            commit('SET_ADDRESS_INFO', res.data);
        },
        // 根据关键字搜索附近：带经纬度和不带经纬度
        async getNearbyAddressList({commit,getters},keyword){
            if(!keyword) return;
            let params = getters.latitude&&getters.longitude ? {
                keyword:keyword,
                offset:0,
                limit:20,
                latitude: getters.latitude,
                longitude:getters.longitude,
            } : {
                keyword:keyword,
                offset:0,
                limit:20,
            }
            let res = await $get(getUrl.nearby_position,params);
            commit('SET_NEATBY_ADDRESS_LIST', res.data);
        },
        async getUserAddressList({commit,getters}){   
            let res = await $get(getUrl.user_address+'/'+getters.userId+'/address');
            commit('SET_USER_ADDRESS_List',res.data);
        }
      
    }
}