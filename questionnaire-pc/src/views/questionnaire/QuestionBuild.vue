<template>
    <div id="question_build">
      <el-row v-for="(question, key) in questions" :key ="key">
        <el-row>
          <el-col :span="1" class="question-num">{{ "Q" + (questions.indexOf(question) + 1)}}、</el-col>
          <el-col :span="22"><el-input type="text" class="custom-input" v-model="question.title"></el-input></el-col>
        </el-row>
        <div v-if="question.type !== 'textarea'" class="question-options">
          <el-row v-for="(option, index) in question.options" :key = "index" track-by="$index">
            <el-col :span="1" style="margin-top: 10px">
              <el-radio v-if="question.type === 'radio'" ></el-radio>
              <el-checkbox v-if="question.type === 'checkbox'"></el-checkbox>
            </el-col>
            <el-col :span="21">
              <el-input class="custom-input" v-model="question.options[index]"></el-input>
            </el-col>
            <el-col :span="2" class="align-right">
              <el-button size="small" icon="el-icon-close" circle class="delete-option" @click="deleteOption(question, option)"></el-button>
            </el-col>
          </el-row>
        </div>
        <div v-if="question.type === 'textarea'">
          <el-row>
            <el-input type="textarea"></el-input>
            <label>
              <input type="checkbox"
                     name="survey-choose"
                     :checked="question.mandatory"
                     @click="toggleMandatory(question)">&nbsp;此题是否必填
            </label>
          </el-row>
        </div>
        <el-row>
          <el-button type="info" icon="el-icon-plus" size="small" round
                     class = "add-option"
                     v-if="question.type !== 'textarea'"
                     @click="addOption(question)">新增选项
          </el-button>
        </el-row>
        <el-row class="align-right">
          <el-col>
            <el-button size="small" round v-if="questions.indexOf(question)>0" @click="upQuestion(question)">上移</el-button>
            <el-button size="small" round v-if="questions.length > 1 && questions.indexOf(question) < (questions.length - 1)"
                       @click="downQuestion(question)">下移</el-button>
            <el-button size="small" round @click="copyQuestion(question)">复用</el-button>
            <el-button size="small" round @click="deleteQuestion(question)">删除</el-button>
          </el-col>
        </el-row>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "question-build",

        methods: {
          upQuestion(question) {
            this.$store.dispatch('updateActiveQuestionnaire', {operate: "question-up", question: question})
          },

          downQuestion(question) {
            this.$store.dispatch('updateActiveQuestionnaire', {operate: "question-down", question: question})
          },

          copyQuestion(question) {
            this.$store.dispatch('updateActiveQuestionnaire', {operate: "question-copy", question: question})
          },

          deleteQuestion(question) {
            this.$store.dispatch('updateActiveQuestionnaire', {operate: "question-delete", question: question})
          },

          addOption(question) {
            this.$store.dispatch('updateActiveQuestionnaire', {operate: "option-add", question: question})
          },

          deleteOption(question, option) {
            this.$store.dispatch('updateActiveQuestionnaire', {operate: "option-delete", question: question, option: option})
          },

          toggleMandatory(question) {
            this.$store.dispatch('updateActiveQuestionnaire', {operate: "mandatory-toggle", question: question})
          }
        },

        props: ["questions"]
    }
</script>

<style scoped>
  .question-num {
    margin: 8px 0;
  }

  .question-options{

  }

  .question-options:hover {
    color: #CB1B45;
    cursor: pointer;
  }

  .align-right {
    text-align: right
  }

  .delete-option {
    height: 1.5em;
    margin-top: 10px;
    padding: 0 5px !important;
    font-size: .8em;
    line-height: 1.2em;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
  }

  .add-option {
    height: 1.5em;
    padding: 0 5px !important;
    font-size: .8em;
    line-height: 1.2em;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
  }

  .add-option:hover {
    color: #000;
    border: 1px dashed #000;
  }
</style>
