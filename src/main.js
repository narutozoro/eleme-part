import Vue from 'vue'
import App from './App.vue'
import router from './routes';
import store from './store';
import './config/vueconfig'



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


