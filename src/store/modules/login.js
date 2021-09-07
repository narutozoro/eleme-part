import { $get, $post } from '@/config/http/http';
import { getUrl,postUrl } from '@/config/http/url';


// console.log(localStorage);
export default {
    state: {
        picCaptcha:null,//图形验证码
        validateToken:'',//登录成功验证令牌
        userId:localStorage.getItem('userId') ? localStorage.getItem('userId') : 0,//用户id
        user:localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,//用户信息
    },
    getters: {
        userId:state => state.userId,
        user:state => state.user,
        isLogin:state => state.userId != 0,
    },
    mutations: {
        SET_PIC_CAPTCHA(state, data) {
            state.picCaptcha = data;
        },
        SET_VALIDATE_TOLEN(state,v){
            state.validateToken = v;
        },
        SET_USER_ID(state,v){
            state.userId = v;
            localStorage.setItem('userId',v);
        },
        SET_USER(state,v){
            state.user = v;
            localStorage.setItem('user',JSON.stringify(state.user));
        },
    },
    actions: {
        // 获取图形验证码
        async getPicCaptcha({commit},phone){
            let res = await $post(postUrl.pic_captcha,{
                captcha_str:phone
            });
            commit("SET_PIC_CAPTCHA",res.data);
        },
        // 获取短信验证码
        async getSmsCaptcha({commit,state},{phone,code}){
            let res = await $post(postUrl.sms_captcha,{
                captcha_hash:state.picCaptcha ? state.picCaptcha.captcha_hash : '',
                captcha_value:code || '',
                mobile:phone,
                scf:"ms"
            });
            console.log('短信验证码：',res.data);
            commit("SET_VALIDATE_TOLEN",res.data.validate_token);
        },
        // 登录请求
        async login({commit, dispatch ,state},{phone,code}){
            let res = await $post(postUrl.login,{
                mobile:phone,
                scf:"ms",
                validate_code:code,
                validate_token:state.validateToken
            });
            commit('SET_USER_ID',res.data.user_id);
            dispatch('getUserId');
        },
        // 获取用户id
        async getUserId({commit,getters}){
            if (getters.isLogin) {
                return;
            }
            let res = await $get(getUrl.userid);
            commit('SET_USER_ID',res.data);
        },
        // 判断是否登录和获取用户信息
        async getUserInfo({commit,state}){
            let res = await $get(getUrl.userinfo+state.userId+'?');
            commit('SET_USER',res.data);
        },
        // 退出登录
        async logout({commit,state}){
            await $post(postUrl.logout,state.user);
            commit('SET_USER',null);
            commit('SET_USER_ID',0);
            commit("SET_PIC_CAPTCHA",null);
            commit("SET_VALIDATE_TOLEN",'');
            localStorage.clear();
        },
        
    }
}