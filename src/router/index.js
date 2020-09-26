import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../auth/Login.vue')
  }, 
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../auth/Register.vue')
  },
  {
    path: '/user-dashboard',
    name: 'userDashboard',
    component: () => import(/* webpackChunkName: "register" */ '../components/pages/userDashboard.vue')
  },      
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "cart" */ '../components/pages/Cart.vue')
  },   
  {
    path: '/list/:id',
    component: () => import(/* webpackChunkName: "list" */ '../components/pages/productList.vue'),
    children: [
      {
        path: '/product',
        name: 'singleProduct',
        component: () => import(/* webpackChunkName: "product" */ '../components/pages/singleProduct.vue')
      }        
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
