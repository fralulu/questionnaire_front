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

let QuestionnaireBuild = resolve => {
  require.ensure(['./questionnaire/QuestionnaireBuild.vue'], () => {
    resolve(require('./questionnaire/QuestionnaireBuild.vue'))
  })
}

let QuestionnaireDisplay = resolve => {
  require.ensure(['./questionnaire/QuestionnaireDisplay.vue'], () => {
    resolve(require('./questionnaire/QuestionnaireDisplay.vue'))
  })
}

let ResultDisplay = resolve => {
  require.ensure(['./questionnaire/ResultDisplay.vue'], () => {
    resolve(require('./questionnaire/ResultDisplay.vue'))
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
        title: '问卷列表',
        requiresAuth: true
      }
    },
    {
      path: 'questionnaire/list',
      name: 'Index',
      component: Index,
      meta: {
        title: '问卷列表',
        requiresAuth: true
      }
    },
    {
      path: 'questionnaire/edit',
      name: 'QuestionnaireBuild',
      component: QuestionnaireBuild,
      meta: {
        title: '新建问卷',
        requiresAuth: true
      }
    },
    {
      path: 'questionnaire/edit/:questionnaireId',
      name: 'QuestionnaireBuild',
      component: QuestionnaireBuild,
      meta: {
        title: '编辑问卷',
        requiresAuth: true
      }
    },
    {
      path: 'questionnaire/fill/:questionnaireId',
      name: 'QuestionnaireDisplay',
      component: QuestionnaireDisplay,
      meta: {
        title: '填写问卷',
        requiresAuth: false
      }
    },
    {
      path: 'questionnaire/result/:questionnaireId',
      name: 'ResultDisplay',
      component: ResultDisplay,
      meta: {
        title: '问卷结果',
        requiresAuth: true
      }
    }
  ]
}
