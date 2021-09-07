import { $get } from '@/config/http/http';
import { getUrl } from '@/config/http/url';

export default {
    state: {
        cateData: [], //分类数据
        recommendData:[],//推荐数据
        restaurantList: [], //商家列表
    },
    getters: {
        catelist:state => {
            var bigArray = [];
            var smallArray = [];
            for (var i = 0; i < state.cateData.length; i++) {
                smallArray.push(state.cateData[i]);
                if ((i + 1) % 10 == 0 || i == state.cateData.length - 1) {
                    bigArray.push(smallArray);
                    smallArray = [];
                }
            }
            return bigArray;
        },
    },
    mutations: {
        SET_CATE_DATA(state, data) {
            state.cateData = data;
        },
        SET_RECOMMEND_DATA(state, data) {
            state.recommendData = data;
        },
        SET_RESTAURANT_List(state, data) {
            state.restaurantList = data;
        }
    },
    actions: {
        // 获取分类信息
        async getCategary({ commit, getters }) {
            let param = {
                latitude: getters.latitude,
                longitude: getters.longitude,
                templates:['main_template','favourable_template','svip_template'],
                terminal:'h5',
            }
            let res = await $get(getUrl.catelist, param);
            commit('SET_RECOMMEND_DATA', res.data[0].entries[0]);
            commit('SET_CATE_DATA', res.data[1].entries);
        },
        // 获取商家列表
        async getRestaurant({ commit, getters }, offset = 0) {
            let param = {
                latitude: getters.latitude,
                longitude: getters.longitude,
                offset: offset,
                limit:8,
                extras:['activities','tags'],
                extra_filters:'home',
                terminal:'h5',
                rank_id:''
            }
            let res = await $get(getUrl.restaurants, param);
            // console.log('获取首页商家列表');
            // console.dir(res.data);
            commit('SET_RESTAURANT_List',res.data.items);
            
        },
    }
}