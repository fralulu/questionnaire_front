import Vue from 'vue'
import Router from 'vue-router'
import user from '../store/module/user'
import Login from '@/components/Login'
import views from '../views/router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: 'Login登录'
      }
    },
    {
      path: '/',
      name: 'Home',
      redirect: '/home'
    },
    views
  ]
})
// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  // 获取store里面的token
  let token = user.state.token
  // 判断要去的路由有没有requiresAuth
  if (to.meta.requiresAuth) {
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 将刚刚要去的路由path作为参数，方便登录成功后直接跳转到该路由
      })
    }
  } else {
    next()
  }
})
export default router
