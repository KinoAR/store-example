import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Home from '@/components/Home'
import About from '@/compontents/About'
import Products from '@/components/Products'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, 
    {
      path: '/products',
      name: 'Products',
      component: null
    }, 
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
