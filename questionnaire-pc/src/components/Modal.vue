<template>
    <div>
      <el-dialog
        title="提示"
        :visible.sync="getModalState"
        width="25%"
        top="23vh">
        <span>{{ content }}</span>
        <span slot="footer" v-show="type === 'modal'">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
        <span slot="footer" v-show="type === 'alert'">
          <el-button type="primary" @click="cancel">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "modal",

        computed: {
          ...mapGetters({
            getModalState: 'getModalState'
          })
        },

        props: {
          type: {
            type: String,
            default: ''
          },
          content: {
            type: String,
            default: ''
          },
          onConfirm: {
            type: Function
          }
        },

        methods: {
          isFunction(functionToCheck) {
            let getType = {}
            return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]'
          },
          confirm() {
            this.$emit('confirm')
            if (this.isFunction(this.onConfirm)) {
              this.onConfirm()
            }
            this.$store.dispatch("updateModalState")
          },
          cancel() {
            this.$store.dispatch("updateModalState")
          }
        }
    }
</script>

<style scoped>

</style>
