<template>
  <div class="content">
    <div class="container list">
      <div class="main">
        <h1>{{ activeQuestionnaire.title }}</h1>
        <hr>
        <el-row>
          <div class="questionnaire-fill" v-for="(question, index) in activeQuestionnaire.questions" :key="index">
            <div class="questionnaire-title-fill">
              {{ "Q" +  (activeQuestionnaire.questions.indexOf(question) + 1) + ".&nbsp;" + question.title}}
            </div>
            <div class="questionnaire-options-fill" v-if="question.type !== 'textarea'">
              <div class="option" v-for="(option, idx) in question.options" :key="idx">
                <label v-if="question.type === 'checkbox'">
                  <input type="checkbox"
                         :name="activeQuestionnaire.questions.indexOf(question)"
                         :value="option"
                         v-model="question.choose">
                  {{ option }}
                </label>
                <label v-if="question.type === 'radio'">
                  <input type="radio"
                         :name="activeQuestionnaire.questions.indexOf(question)"
                         :value="option"
                         v-model="question.choose">
                  {{ option }}
                </label>
              </div>
            </div>
            <div class="questionnaire-textarea-fill" v-if="question.type === 'textarea'">
              <textarea v-model="question.content"></textarea>
              <span>此题为{{ mandatory(question) }}</span>
            </div>
          </div>
        </el-row>
        <hr>
        <el-row>
          <el-button type="success" @click="submit(activeQuestionnaire)">提交问卷</el-button>
        </el-row>
        <modal v-if="getModalState" :type="modalType" :content="modalContent" @confirm="modalFunction"></modal>
      </div>
    </div>
  </div>
</template>

<script>
    import Modal from "../../components/Modal"
    import { mapGetters } from 'vuex'

    export default {
        name: "questionnaire-display",

        computed: {
          ...mapGetters({
            activeQuestionnaire: 'getActiveQuestionnaire',
            getModalState: 'getModalState'
          })
        },

        methods: {
          mandatory(question) {
            if (question.mandatory) {
              return "必答"
            } else {
              return "选答"
            }
          },

          resultCheck() {
            let result = false
            for (let question of this.activeQuestionnaire.questions) {
              if (question.type === "radio" && question.choose === "") {
                result = true
                break
              } else if (question.type === "checkbox" && question.choose.length === 0) {
                result = true
                break
              } else if (question.type === "textarea" && question.mandatory && question.content === "") {
                result = true
                break
              }
            }
            return result
          },

          submit(questionnaire) {
            console.log(this.resultCheck())
            if (this.resultCheck()) {
              this.modalType = "alert"
              this.modalContent = "请完整填写问卷。"
              this.modalFunction = function () {}
            } else {
              this.modalType = "modal"
              this.modalContent = "确认要提交问卷吗？"
              this.modalFunction = () => {
                this.$store.dispatch("updateQuestionnaire", {operate: "questionnaire-submit"})
                this.$store.dispatch("updateQuestionnaire", {operate: "questionnaire-edit", questionnaire: questionnaire})
                this.$router.push('/home/questionnaire/list')
              }
            }
            this.$store.dispatch("updateModalState")
          }
        },

        components: {
          Modal
        }
    }
</script>

<style scoped>
  .questionnaire-fill {
    width: 100%;
    padding: 1em 1.5em;
    box-sizing: border-box;
    border: 1px solid #999;
    margin: 1em auto;
  }

  .questionnaire-title-fill {
    font-weight: bold;
  }

  label {
    cursor: pointer;
    border-radius: 3px;
    margin: 0.1em auto;
    padding: 0.4em;
    display: inline-block;
  }

  label:hover {
    background-color: #c0e3ea;
    font-weight: bold;
  }

  textarea {
    width: 100%;
    height: 10em;
    font-size: 16px;
    outline: none;
    resize: none;
    margin: 0.3em auto;
    background-color: transparent;
  }

  .questionnaire-textarea-fill span{
    font-size: 14px;
    font-weight: bold;
    display: block;
  }
</style>
