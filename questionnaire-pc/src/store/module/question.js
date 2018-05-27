/**
 * author: bwzou
 * time: 2018-05-19
 */

const state = {
  questionnaire: [],
  activeQuestionnaire: {
    title: '',
    questions: []
  },
  modalState: false
}

const getters = {
  getQuestionnaire: state => state.questionnaire,
  getActiveQuestionnaire: state => state.activeQuestionnaire,
  getModalState: state => state.modalState
}

const mutations = {
  storeInit(state, data) {
    if (window.localStorage.questionnaireSystem) {
      const localdata = JSON.parse(window.localStorage.questionnaireSystem)
      state.questionnaire = localdata.questionnaire
      state.activeQuestionnaire = localdata.activeQuestionnaire
    } else {
      const newdata = JSON.stringify(data)
      window.localStorage.questionnaireSystem = newdata
      state.questionnaire = data.questionnaire
      state.activeQuestionnaire = data.activeQuestionnaire
    }
  },

  questionnaireAdd(state) {
    let newQuestionnaire = {
      id: Date.now(),
      title: '',
      buildDate: (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + (new Date()).getDate(),
      endDate: '',
      state: 'unpublish',
      questions: []
    }
    state.activeQuestionnaire = newQuestionnaire
  },

  questionnaireEdit(state, questionnaire) {
    state.activeQuestionnaire = JSON.parse(JSON.stringify(questionnaire))
  },

  questionnaireSave(state, questionnaire) {
    state.activeQuestionnaire = questionnaire
    for (let i = 0; i < state.questionnaire.length; i++) {
      if (state.questionnaire[i].id === questionnaire.id) {
        state.questionnaire[i] = questionnaire
        window.localStorage.suverySystem = JSON.stringify(state)
        return
      }
    }
    state.questionnaire.push(state.activeQuestionnaire)
    window.localStorage.suverySystem = JSON.stringify(state)
  },

  questionnaireDelete(state) {
    for (let i = 0; i < state.questionnaire.length; i++) {
      if (state.questionnaire[i].id === state.activeQuestionnaire.id) {
        const idx = state.questionnaire.indexOf(state.activeQuestionnaire)
        state.questionnaire.splice(idx, 1)
        break
      }
    }
    window.localStorage.suverySystem = JSON.stringify(state)
  },

  questionnairePublish(state) {
    for (let question of state.activeQuestionnaire.questions) {
      question.results = {}
      if (question.type !== "textarea") {
        for (let option of question.options) {
          question.results[option] = 0
        }
        if (question.type === 'radio') {
          question.choose = ""
        } else {
          question.choose = []
        }
      } else {
        question.results.effectiveResults = 0
      }
      question.resultsNum = 0
    }
    state.activeQuestionnaire.state = "publish"
  },

  questionnaireSubmit(state) {
    for (let question of state.activeQuestionnaire.questions) {
      if (question.type === "radio") {
        question.results[question.choose]++
        question.choose = ""
      } else if (question.type === "checkbox") {
        question.choose.forEach(function (v) {
          question.results[v]++
        })
        question.choose = []
      } else {
        if (question.content) {
          question.results.effectiveResults++
          question.content = ""
        }
      }
      question.resultsNum++
    }
    for (let i = 0; i < state.questionnaire.length; i++) {
      if (state.questionnaire[i].id === state.activeQuestionnaire.id) {
        state.questionnaire[i] = state.activeQuestionnaire
        window.localStorage.suverySystem = JSON.stringify(state)
        return
      }
    }
  },

  questionAdd(state, type) {
    switch (type) {
      case 'radio':
        state.activeQuestionnaire.questions.push({
          title: "单选题",
          type: "radio",
          options: ["选项1", "选项2"],
          choose: ""
        })
        break
      case 'checkbox':
        state.activeQuestionnaire.questions.push({
          title: "多选题",
          type: "checkbox",
          options: ["选项1", "选项2", "选项3", "选项4"],
          choose: []
        })
        break
      case "textarea":
        state.activeQuestionnaire.questions.push({
          title: "文本题",
          type: "textarea",
          mandatory: false,
          content: ""
        })
        break
    }
  },

  questionCopy(state, question) {
    const newQustion = JSON.parse(JSON.stringify(question))
    const idx = state.activeQuestionnaire.questions.indexOf(question)
    state.activeQuestionnaire.questions.splice(idx, 0, newQustion)
  },

  questionDelete(state, question) {
    const idx = state.activeQuestionnaire.questions.indexOf(question)
    state.activeQuestionnaire.questions.splice(idx, 1)
    window.localStorage.questionnaireSystem = JSON.stringify(state)
  },

  questionUp(state, question) {
    const newQustion = JSON.parse(JSON.stringify(question))
    const idx = state.activeQuestionnaire.questions.indexOf(question)
    state.activeQuestionnaire.questions.splice(idx - 1, 0, newQustion)
    state.activeQuestionnaire.questions.splice(idx + 1, 1)
  },

  questionDown(state, question) {
    const newQustion = JSON.parse(JSON.stringify(question))
    const idx = state.activeQuestionnaire.questions.indexOf(question)
    state.activeQuestionnaire.questions.splice(idx, 1)
    state.activeQuestionnaire.questions.splice(idx + 1, 0, newQustion)
  },

  optionAdd(state, question) {
    const idx = state.activeQuestionnaire.questions.indexOf(question)
    state.activeQuestionnaire.questions[idx].options.push("选项" + (state.activeQuestionnaire.questions[idx].options.length + 1))
  },

  optionDelete(state, question, option) {
    const idx = state.activeQuestionnaire.questions.indexOf(question)
    const ido = question.options.indexOf(option)
    state.activeQuestionnaire.questions[idx].options.splice(ido, 1)
  },

  mandatoryToggle(state, question) {
    const idx = state.activeQuestionnaire.questions.indexOf(question)
    console.log(state.activeQuestionnaire.questions[idx].mandatory)
    state.activeQuestionnaire.questions[idx].mandatory = !state.activeQuestionnaire.questions[idx].mandatory
  },

  modelToggle(state) {
    state.modalState = !state.modalState
  }
}

const actions = {
  updateQuestionnaire({commit, state}, param) {
    switch (param.operate) {
      case "questionnaire-add":
        commit('questionnaireAdd')
        break
      case "questionnaire-edit":
        commit('questionnaireEdit', param.questionnaire)
        break
      case "questionnaire-save":
        commit('questionnaireSave', param.questionnaire)
        break
      case "questionnaire-delete":
        commit('questionnaireDelete')
        break
      case "questionnaire-publish":
        commit("questionnairePublish")
        break
      case "questionnaire-submit":
        commit("questionnaireSubmit")
        break
    }
  },

  updateActiveQuestionnaire({commit, state}, param) {
    switch (param.operate) {
      case "question-add":
        commit('questionAdd', param.type)
        break
      case "question-copy":
        commit('questionCopy', param.question)
        break
      case "question-delete":
        commit('questionDelete', param.question)
        break
      case "question-up":
        commit('questionUp', param.question)
        break
      case "question-down":
        commit('questionDown', param.question)
        break
      case "option-add":
        commit('optionAdd', param.question)
        break
      case "option-delete":
        commit('optionDelete', param.question, param.option)
        break
      case "mandatory-toggle":
        commit('mandatoryToggle', param.question)
        break
    }
  },

  updateModalState({commit}) {
    commit('modelToggle')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
