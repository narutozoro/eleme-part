import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import {debug} from '@/config/tools/tools'
import home from './modules/home';
import login from './modules/login';
import address from './modules/address';

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        home,
        login,
        address,
    },
    plugins:  debug ? [createLogger({logger: console})] : []
});