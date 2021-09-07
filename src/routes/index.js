import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);



let router = new Router({
  routes: [
    {path:'/',component:()=>import('../views/HomeView.vue')},
    {path:'/address',component:()=>import('../views/address/AddressView.vue')},
    {path:'/address/city',component:()=>import('../views/address/CitiyView.vue')},
    
    {path:'/find',component:()=>import('../views/FindView.vue')},
    {path:'/order',component:()=>import('../views/OrderView.vue')},
    {path:'/my',component:()=>import('../views/MyView.vue')},
    {path:'/my/login',component:()=>import('../views/my/LoginView.vue')},
  ],
});

router.afterEach(()=>{
  window.scrollTo(0,0);
});


export default router;
