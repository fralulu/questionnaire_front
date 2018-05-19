/**
 * author: bwzou
 * time: 2018-05-19
 */

const state = {
  questionnaire: [],
  activeQuestionnaire: {},
  modalState: false
}

const getters = {
  getQuestionnaire: state => state.questionnaire,
  getActiveQuestionnaire: state => state.activeQuestionnaire,
  getModalState: state => state.modalState
}

const mutations = {
  setQuestionnaire(state, newQuestionnaire) {
    state.questionnaire = newQuestionnaire
  },

  setActiveQuestionnaire(state, newActiveQuestionnaire){
    state.activeQuestionnaire = newActiveQuestionnaire
  },

  setModalState(state, newModalState){
    state.modalState = newModalState
  }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
