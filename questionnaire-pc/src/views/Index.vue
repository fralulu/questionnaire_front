<template>
  <div class="content">
    <div class="container list">
      <div class="main">
        <el-row>
          <el-col :span="4">
            <el-button >新建问卷</el-button>
          </el-col>
          <el-col :span="8">
            <el-input>请输入问卷名进行搜索</el-input>
          </el-col>
          <el-col :span="6">
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
            :data="questionnaireList"
            style="width: 100%"
            border>
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "index",

        data() {
          return {
            questionnaireList: [],
            states: [{name: '问卷状态', value: 0}, {name: '运行中', value: 1}, {name: '未发布', value: 2}],
            stated: ''
          }
        },

        methods: {
          handleStatedChange() {

          }
        }
    }
</script>

<style scoped>

</style>
