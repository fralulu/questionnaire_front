<template>
  <div class="content">
    <div class="container list">
      <div class="main">
        <h1>{{ activeQuestionnaire.title }}</h1>
        <p>此统计分析只包含已经完整回收的数据</p>
        <hr>
        <div class="questionnaire-results" v-for=" (question, index) in activeQuestionnaire.questions" :key="index">
          <div class="questionnaire-results-title">
            {{ "Q" +  (activeQuestionnaire.questions.indexOf(question) + 1) + ".&nbsp;" + question.title}}
          </div>
          <div class="questionnaire-results-charts" v-if="question.type === 'radio'">
            <bar-charts :results="question.results"
                        :results-num="question.resultsNum"></bar-charts>
          </div>
          <div class="questionnaire-results-charts" v-if="question.type === 'checkbox'">
            <pie-charts :results="question.results"
                        :results-num="question.resultsNum"></pie-charts>
          </div>
          <div class="questionnaire-results-charts" v-if="question.type === 'textarea'">
            <bar-charts :results="question.results"
                        :results-num="question.resultsNum"></bar-charts>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
    import BarCharts from '../customcharts/BarCharts'
    import PieCharts from '../customcharts/PieCharts'
    import { mapGetters } from 'vuex'

    export default {
        name: "result-display",

        computed: {
          ...mapGetters({
            activeQuestionnaire: 'getActiveQuestionnaire',
            getModalState: 'getModalState'
          })
        },

        methods: {

        },

        components: {
          BarCharts,
          PieCharts
        }
    }
</script>

<style scoped>
  h1,p {
    text-align: center;
  }

  .questionnaire-commit div {
    margin: 2em auto;
  }

  .questionnaire-results-title {
    font-weight: bold;
  }
  .questionnaire-results-charts {
    width: 100%;
    height: 400px;
  }
  .questionnaire-results {
    width: 100%;
    padding: 1em 1.5em;
    box-sizing: border-box;
    margin: 1em auto;
    border: 1px solid #aaa;
  }
</style>
