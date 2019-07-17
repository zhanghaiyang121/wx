import Vue from 'vue'
import Router from 'vue-router'
import indexpage from '@/components/index'
import userlistpage from '@/components/userlist'
import signinpage from '@/components/signin'
import signuppage from '@/components/signup'
import movieadmin from '@/components/movieAdmin'
import movielist from '@/components/movielist'
import categoryadmin from '@/components/categoryadmin'
import categorylist from '@/components/categorylist'
import detail from '@/components/detail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'indexpage',
      component: indexpage
    },
    {
      path: '/userlist',
      name: 'userlistpage',
      component: userlistpage
    },
    {
      path: '/signin',
      name: 'signinpage',
      component: signinpage
    },
    {
      path: '/signup',
      name: 'signuppage',
      component: signuppage
    },
    {
      path: '/movieadmin',
      name: 'movieadmin',
      component: movieadmin
    },
    {
      path: '/movielist',
      name: 'movielist',
      component: movielist
    },
    {
      path: '/categoryadmin',
      name: 'categoryadmin',
      component: categoryadmin
    },
    {
      path: '/categorylist',
      name: 'categorylist',
      component: categorylist
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    }
  ]
})
