import Vue from 'vue';
Vue.config.productionTip = false;

// 移动端尺寸适配
import './tools/FontSize';


// vant 组件库
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// 处理await异常
import to from 'await-to-js';
Vue.prototype.$to = to;


import {isImgHash, addPrefix, isPhoneReg} from './tools/tools'

// 全局过滤器配置
Vue.filter('isImgHash',isImgHash);
Vue.filter('addPrefix',addPrefix);

// 全局混入
Vue.mixin({
    methods: {
        isPhoneReg
    },
});



import { Toast, Dialog } from 'vant';
// Vue.use(Toast);
// 提示信息
Vue.prototype.$toast = Toast;
// 弹窗
Vue.prototype.$dialog = Dialog;
// https://www.bbsmax.com/A/GBJrNKnKJ0/



