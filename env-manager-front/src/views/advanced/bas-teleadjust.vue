<template>
    <div class="basteleadjust">
    <div class="basteleadjust__filter-container p-filter-container">
        <span class="p-table-name">遥调量基本列表</span>
          <section class="p-input-wrapper">
        <input placeholder="请输入内容" v-model="searchName"  class="p-input">
          </section>
        <span class="p-add-btn" @click="add">
            ✚  查看
        </span>
    </div>

    <section class="basteleadjust__table">
        <el-table element-loading-text="拼命加载中" empty-text="暂无数据"
        :data="list" stripe
        border fit highlight-current-row>
        <el-table-column fixed  label="编号" align="center">
        <template slot-scope="scope">
            <span>{{ scope.row.basMeteId }}</span>
        </template>
        </el-table-column>
        <el-table-column label="名称" align="center">
        <template slot-scope="scope">
            <span>{{ scope.row.basMeteName }}</span>
        </template>
        </el-table-column>
        <el-table-column label="英文名称" align="center">
        <template slot-scope="scope">
            <span>{{ scope.row.basMeteNameEn }}</span>
        </template>
        </el-table-column>

        <el-table-column label="设备类型" align="center">
            <template slot-scope="scope">
                <span>{{ scope.row.deviceType }}</span>
            </template>
        </el-table-column>

        <el-table-column label="遥调量类型" align="center">
            <template slot-scope="scope">
                <span>{{ scope.row.meteType }}</span>
            </template>
        </el-table-column>

        <el-table-column label="遥调量类型名称" align="center">
            <template slot-scope="scope">
                <span>{{ scope.row.metetypeName }}</span>
            </template>
        </el-table-column>

        <el-table-column label="子序号" align="center">
            <template slot-scope="scope">
                <span>{{ scope.row.sameMetetypeIndex }}</span>
            </template>
        </el-table-column>
      
        <el-table-column label="监控量类型" align="center">
            <template slot-scope="scope">
                <span>{{ scope.row.meteKind }}</span>
            </template>
        </el-table-column>

        <el-table-column label="英文名称" align="center">
            <template slot-scope="scope">
                <span>{{ scope.row.metetypeNameEn }}</span>
            </template>
        </el-table-column>

        <el-table-column label="上限" align="center">
            <template slot-scope="scope">
                <span>{{ scope.row.upEffect }}</span>
            </template>
        </el-table-column>

        <el-table-column label="下限" align="center">
            <template slot-scope="scope">
                <span>{{ scope.row.lowEffect }}</span>
            </template>
        </el-table-column>

        <el-table-column label="精度" align="center">
            <template slot-scope="scope">
                <span>{{ scope.row.accuracy }}</span>
            </template>
        </el-table-column>

        <el-table-column label="单位" align="center">
            <template slot-scope="scope">
                <span>{{ scope.row.unit }}</span>
            </template>
        </el-table-column>

        <el-table-column label="FSU通道号" align="center">
            <template slot-scope="scope">
                <span>{{ scope.row.basChannelNo }}</span>
            </template>
        </el-table-column>

        <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
            <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button v-if="false"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
        </el-table-column>
    </el-table>
    </section>

    <!--  修改记录 -->
    <section class="layer__dialog">
        <el-dialog title="修改遥调量基本信息" :visible.sync="isShowEditDialog">
            <el-form ref="modifyForm" label-position="left"  label-width="200px"  :model="modifyForm" :rules="modifyFormRules">
                <el-form-item label="遥调量基本名称" prop="basMeteName" >
                    <el-input v-model="modifyForm.basMeteName" readonly ></el-input>
                </el-form-item>
                  <el-form-item label="有效上限" prop="upEffect" >
                    <el-input v-model="modifyForm.upEffect" placeholder="请输入有效上限"></el-input>
                </el-form-item>
                <el-form-item label="有效下限" prop="lowEffect" >
                    <el-input v-model="modifyForm.lowEffect" placeholder="请输入有效下限"></el-input>
                </el-form-item>

                <el-form-item label="精度" prop="accuracy" >
                    <el-input-number v-model="modifyForm.accuracy" placeholder="精度" :min="1" :max="3"></el-input-number>
                </el-form-item>
                <el-form-item label="缺省值" >
                    <el-input v-model="modifyForm.defaultValue" placeholder="请输入缺省值" ></el-input>
                </el-form-item>
                <el-form-item label="单位" prop="unit" >
                    <el-input v-model="modifyForm.unit" placeholder="请输入单位" :maxlength="8"></el-input>
                </el-form-item>
                <el-form-item label="FSU通道号" prop="basChannelNo"  v-if="false">
                    <el-input v-model="modifyForm.basChannelNo" placeholder="请输入FSU通道号"></el-input>
                </el-form-item>

                <el-row type="flex" >
                    <el-col class="p-oneline">
                        <el-button @click="isShowEditDialog=false" class="p-cancle-btn">取消</el-button>
                        <el-button type="primary" @click="confirmModify" class="p-save-btn">保存</el-button>
                    </el-col>
                </el-row>

            </el-form>
        </el-dialog>
    </section>



    </div>
</template>

<script>
import { getAll, modifyItem } from "@/api/advanced"

export default {
  name: "basteleadjust",
  data() {
    return {
      rawList: [],
      list: [],
      // 级别列表
      searchName: "",
      isShowAddDialog: false,
      isShowEditDialog: false,
      modifyForm: {},
      modifyFormRules: {
        upEffect: [{ required: true, message: "遥调量有效上限", trigger: "blur", type: 'number' }],
        lowEffect: [{ required: true, message: "遥调量有效下限", trigger: "blur", type: 'number' }],
        accuracy: [{ required: true, message: "遥调量精度" }],
        unit: [{ required: true, message: "遥调量单位", trigger: "blur" }]
        // basChannelNo:[{ required: true, message: "遥调量FSU通道号", trigger: "blur" }]

      }

    }
  },
  watch: {
    searchName: function(val, oldVal) {
      if (val) {
        this.list = this.rawList.filter(
          x => x.name.indexOf(val) > -1 || x.nameEn.indexOf(val) > -1
        )
      } else {
        this.list = this.rawList
      }
    }
  },

  mounted() {
    const me = this
    me.getList()
  },
  methods: {
    getList() {
      const me = this
      getAll("/teleadjust/")
        .then(response => {
          const { success, data, msg } = response.data
          if (success) {
            me.list = data
            me.rawList = data
            // 获取数据
          } else {
            me.$message.error(msg)
          }
        })
        .catch(err => {
          me.$message.error("网络错误")
        })
    },

    handleEdit(index, row) {
      const me = this
      const backdata = JSON.parse(JSON.stringify(row))
      me.modifyForm = backdata
      me.isShowEditDialog = true
    },
    // 添加记录
    add() {
      this.$message.info("添加数据通过高级设置->模板管理->监控量模板管理->导入 批量导入添加")
      // this.isShowAddDialog = true;
    },
    confirmModify() {
      const me = this
      // PUT /teleadjust/{basMeteId}/{deviceType}/{meteType}
      const currentItem = me.modifyForm
      me.$refs.modifyForm.validate(valid => {
        if (valid) {
          modifyItem('/teleadjust/', me.modifyForm).then(response => {
            const { success, data, msg } = response.data
            me.isShowEditDialog = false
            if (success) {
              me.$message.success("修改成功")
              me.getList()
            } else {
              me.$message.error(msg)
            }
          })
            .catch(err => {
              me.$message.error("网络错误")
            })
        } else {
          me.$message.error("请提交正确的数据")
        }
      })
    },

    confirmAdd() {
      const me = this
      me.$refs.addForm.validate(valid => {
        if (valid) {
          addItem('/teleadjust/', me.addForm)
            .then(response => {
              const { success, data, msg } = response.data
              me.isShowAddDialog = false
              if (success) {
                me.$message.success("添加成功")
                me.getList()
              } else {
                me.$message.error(msg)
              }
            })
            .catch(err => {
              me.$message.error("网络错误")
            })
        } else {
          me.$message.error("请提交正确的数据")
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.basteleadjust {
  text-align: center;
  &__filter-container {
  }
  &__table {
    text-align: center;
  }
}
</style>

