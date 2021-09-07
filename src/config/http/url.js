import {debug} from '../tools/tools'

const baseurl = debug ? '/ele' : 'https://h5.ele.me';

let getUrl = {
    address:'/restapi/bgs/poi/reverse_geo_coding',  //位置
    nearby_position:'/restapi/bgs/poi/search_poi_nearby_alipay',//获取附近位置
    catelist:'/restapi/shopping/v2/entries', //推荐
    // 需要登录的请求
    restaurants:'/restapi/shopping/v3/restaurants',//首页商家
    userid:'/restapi/eus/v2/current_user?info_raw={}',//获取用户id
    userinfo:'/restapi/eus/v3/users/',//获取用户信息
    user_address:'/restapi/member/v1/users/',//用户收货地址
}
let postUrl = {
    pic_captcha:'/restapi/eus/v3/captchas',//图形验证码
    sms_captcha:'/restapi/eus/login/mobile_send_code',//短信验证码
    login:'/restapi/eus/login/login_by_mobile',  //登录
    logout:'/restapi/eus/login/logout',//退出登录
}


for (const key in getUrl) {
    // if (getUrl.hasOwnProperty(key)) {
        getUrl[key] = baseurl+getUrl[key];
    // }
}

for (const key in postUrl) {
    // if (postUrl.hasOwnProperty(key)) {
        postUrl[key] = baseurl + postUrl[key];
    // }
}

export {
    getUrl,
    postUrl
};