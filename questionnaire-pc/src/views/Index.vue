<template>
  <div class="content">
    <div class="container list">
      <div class="main">
        <el-row class="toolbar">
          <el-col :span="4">
            <el-button @click.native.prevent="handleAdd" type="success">新建问卷</el-button>
          </el-col>
          <el-col :span="6">
            <el-input>请输入问卷名进行搜索</el-input>
          </el-col>
          <el-col :span="4" >
            <el-select v-model="stated" placeholder="请选择状态" @change="handleStatedChange">
              <el-option
                v-for="item in states"
                :key = "item.value"
                :value= "item.value"
                :label = "item.name">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-table
            :data="questionnaire"
            style="width: 100%"
            border>
            <el-table-column
              prop="title"
              min-width="150"
              label="标题">
            </el-table-column>
            <el-table-column
              prop="time"
              min-width="100"
              label="时间">
            </el-table-column>
            <el-table-column
              min-width="100"
              label="状态">
              <template slot-scope="scope">
                <span>{{ stateCheck(scope) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              min-width="200"
              label="操作">
              <template slot-scope="scope">
                <el-button v-show="scope.row.state !== 'publish'"
                           @click.native.prevent="handleUpdate(scope)" size="small">
                  编辑
                </el-button>
                <el-button  v-show="scope.row.state !== 'publish' || new Date(scope.row.endDate) < new Date()"
                            @click.native.prevent="handleDelete(scope)" size="small" type="error">
                  删除
                </el-button>
                <el-button v-show="scope.row.state !== 'unpublish' && new Date(scope.row.endDate) > new Date()"
                           @click.native.prevent="handleFill(scope)" size="small">
                  填写问卷
                </el-button>
                <el-button v-show="scope.row.state !== 'unpublish'"
                           @click.native.prevent="handleSelect(scope)" size="small">
                  查看数据
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <modal v-if="getModalState" type="modal" content="确认删除此问卷？" @confirm="modalFunction"></modal>
      </div>
    </div>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Modal from '../components/Modal'

    export default {
        name: "index",

        data() {
          return {
            states: [{name: '问卷状态', value: ''}, {name: '运行中', value: 'publish'}, {name: '未发布', value: 'unpublish'}, {name: '已结束', value: 'end'}],
            stated: ''
          }
        },

        computed: {
          ...mapGetters({
            questionnaire: 'getQuestionnaire',
            getModalState: 'getModalState'
          })
        },

        methods: {
          stateCheck(scope) {
            if (scope.row.state === 'unpublish') {
              return "未发布"
            } else if (scope.row.state === "publish") {
              return "发布中"
            } else {
              return "已结束"
            }
          },

          handleStatedChange(val) {
            console.log(val)
          },

          handleAdd() {
            this.$store.dispatch("updateQuestionnaire", {operate: "questionnaire-add"})
            this.$router.push('/home/questionnaire/edit')
          },

          handleUpdate(scope) {
            this.$store.dispatch("updateQuestionnaire", {operate: "questionnaire-edit", questionnaire: scope.row})
            this.$router.push('/home/questionnaire/edit/' + scope.row.id)
          },

          handleDelete(scope) {
            this.$store.dispatch("updateQuestionnaire", {operate: "questionnaire-edit", questionnaire: scope.row})
            this.modalFunction = () => {
              this.$store.dispatch("updateQuestionnaire", {operate: "questionnaire-delete"})
            }
            this.$store.dispatch("updateModalState")
          },

          handleFill(scope) {
            this.$store.dispatch("updateQuestionnaire", {operate: "questionnaire-edit", questionnaire: scope.row})
            this.$router.push('/home/questionnaire/fill/' + scope.row.id)
          },

          handleSelect(scope) {
            this.$store.dispatch("updateQuestionnaire", {operate: "questionnaire-edit", questionnaire: scope.row})
            this.$router.push('/home/questionnaire/result/' + scope.row.id)
          }
        },

        components: {
          Modal
        }
    }
</script>

<style scoped>
  .toolbar {
    margin: 20px 0;
  }
</style>
