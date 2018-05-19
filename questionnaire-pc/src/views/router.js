let Home = resolve => {
  require.ensure(['./Home.vue'], () => {
    resolve(require('./Home.vue'))
  })
}

let Index = resolve => {
  require.ensure(['./Index.vue'], () => {
    resolve(require('./Index.vue'))
  })
}

export default {
  path: '/home',
  name: 'Home',
  component: Home,
  meta: {
    title: '用户主页',
    requiresAuth: true
  },
  beforeEnter(to, from, next) {
    if (/home\/?$/.test(to.path)) {
      next({path: '/home/index'})
      return
    }
    next()
  },

  children: [
    {
      path: 'index',
      name: 'Index',
      component: Index,
      meta: {
        title: '用户列表',
        requiresAuth: true
      }
    }
  ]
}
