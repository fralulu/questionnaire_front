<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes"
             :unique-opened="true"
             :router="true"
             text-color="#000000">
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-row :key="item.index">
            <el-submenu :index="item.index"  class="el-submenu-title">
              <template slot="title" ><i :class="item.icon"></i>{{ item.title }}</template>
              <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index" class="nav-menu-item">
                {{ subItem.title }}
              </el-menu-item>
            </el-submenu>
          </el-row>
        </template>
        <template v-else>
          <el-row :key="item.index">
            <el-menu-item :index="item.index" class="nav-menu-item">
              <i :class="item.icon"></i>{{ item.title }}
            </el-menu-item>
          </el-row>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
    import ElRow from "element-ui/packages/row/src/row"

    export default {
      components: {ElRow},
      name: "nav-side",

      data() {
        return {
          items: [
            {
              icon: 'el-icon-question',
              index: 'readme',
              title: '简介'
            },
            {
              icon: 'el-icon-tickets',
              index: 'questionnaire',
              title: '我的问卷',
              subs: [
                {
                  index: 'questionnaire/list',
                  title: '问卷列表'
                },
                {
                  index: 'questionnaire/add',
                  title: '创建问卷'
                }
              ]
            },
            {
              icon: 'el-icon-setting',
              index: 'userCenter',
              title: '设置',
              subs: [
                {
                  index: 'upload',
                  title: '文件上传'
                },
                {
                  index: 'modifyUser',
                  title: '修改用户'
                },
                {
                  index: 'modifyPassword',
                  title: '修改密码'
                }
              ]
            }
          ]
        }
      },

      computed: {
        onRoutes() {
          return this.$route.path.replace('/', '')
        }
      }
    }
</script>

<style scoped>
  .sidebar{
    display: block;
    position: fixed;
    width: 14rem;
    left: 0;
    top: 4rem;
    bottom:0;
  }

  .sidebar > ul {
    height:100%;
  }

  .nav-menu-item {
    height: 4rem;
    line-height: 4rem;
    font-size: 1rem;
    padding: 0.3rem 1rem;
  }
</style>
