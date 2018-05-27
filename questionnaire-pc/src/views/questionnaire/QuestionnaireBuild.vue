<template>
    <div class="content">
      <div class="container list">
        <div class="main">
          <el-row>
            <el-input
              type="text"
              id="title"
              class="user-input"
              placeholder="这里是标题"
              autocomplete="off"
              v-model="activeQuestionnaire.title"></el-input>
            <hr>
            <question-build :questions="activeQuestionnaire.questions"></question-build>
            <div class="question-toolbar">
              <div v-if="showSelector" class="question-type">
                <el-button @click="addQuestion('radio')">单选</el-button>
                <el-button @click="addQuestion('checkbox')">多选</el-button>
                <el-button @click="addQuestion('textarea')">文本框</el-button>
              </div>
              <div class="question-add">
                <el-button @click="toggleSelector()">添加问题</el-button>
              </div>
            </div>
            <hr>
            <div class="questionnaire-end-date">
              <el-date-picker
                v-model="activeQuestionnaire.endDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
              <span>问卷截止时间</span>
            </div>
            <div class="questionnaire-control">
              <el-button type="success" @click="saveEdit()">保存问卷</el-button>
              <el-button type="warning" @click="publish()">发布问卷</el-button>
            </div>
          </el-row>
          <modal v-if="getModalState" :type="modalType" :content="modalContent" @confirm="modalFunction"></modal>
        </div>
      </div>
    </div>
</template>

<script>
    import QuestionBuild from './QuestionBuild'
    import Modal from '../../components/Modal'
    import { mapGetters } from 'vuex'

    export default {
        name: "questionnaire-build",

        data() {
          return {
            showSelector: false
          }
        },

        computed: {
          ...mapGetters({
            activeQuestionnaire: 'getActiveQuestionnaire',
            getModalState: 'getModalState'
          })
        },

        created() {
          let questionnaireId = this.$route.params.questionnaireId
          if (!questionnaireId) {
            this.$store.dispatch("updateQuestionnaire", {operate: "questionnaire-add"})
          }
        },

        methods: {
          addQuestion(type) {
            this.$store.dispatch('updateActiveQuestionnaire', {operate: "question-add", type: type})
          },

          toggleSelector() {
            this.showSelector = !this.showSelector
          },

          saveEdit() {
            if (!this.activeQuestionnaire.title) {
              this.activeQuestionnaire.title = "这里是标题"
            }
            this.$store.dispatch("updateQuestionnaire", {operate: "questionnaire-save", questionnaire: this.activeQuestionnaire})
            this.modalType = "alert"
            this.modalContent = "问卷已保存"
            this.modalFunction = function () {}
            this.$store.dispatch("updateModalState")
          },

          questionCheck() {
            let result = false
            if (this.activeQuestionnaire.questions.length === 0) {
              result = true
            }
            for (let question of this.activeQuestionnaire.questions) {
              if (question.type !== "textarea" && question.options.length < 2) {
                result = true
                break
              }
            }
            return result
          },

          publish() {
            if (this.questionCheck()) {
              this.modalType = "alert"
              this.modalContent = "请合理设置问卷内容。"
              this.modalFunction = function () {}
            } else {
              if (!this.activeQuestionnaire.title) {
                this.activeQuestionnaire.title = "这里是标题"
              }
              this.modalType = "modal"
              this.modalContent = "是否发布问卷？ <br>（本问卷截止日期为" + (new Date(this.activeQuestionnaire.endDate).getFullYear() + "-" + (new Date(this.activeQuestionnaire.endDate).getMonth() + 1) + "-" + new Date(this.activeQuestionnaire.endDate).getDate()) + "）"
              this.modalFunction = () => {
                this.$store.dispatch("updateQuestionnaire", {operate: "questionnaire-save", questionnaire: this.activeQuestionnaire})
                this.$store.dispatch("updateQuestionnaire", {operate: "questionnaire-publish"})
                this.$store.dispatch("updateQuestionnaire", {operate: "questionnaire-edit", questionnaire: this.activeQuestionnaire})
                this.$router.push('/home/index') // 回到List主页
              }
            }
            this.$store.dispatch("updateModalState")
          }
        },

        components: {
          QuestionBuild,
          Modal
        }
    }
</script>

<style scoped>
  .question-add {
    margin-top: 15px;
    text-align: center;
  }

  .question-toolbar {
    margin-top: .5rem;
    padding: .5rem 2rem;
    border: 2px solid #706d74;
  }

  .question-type {
    text-align: center;
  }

  .questionnaire-end-date {
    margin: 1.5rem 0;
  }

  .questionnaire-control {
    margin-bottom: 1rem;
  }
</style>
