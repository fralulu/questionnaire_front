<template>
  <header class="header">
    <div class="logo">著名问卷系统</div>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      :router="router"
      background-color="#08B456"
      text-color="#FFFFFF"
      active-text-color="#FFFFFF"
      style="display: inline-block;">
      <el-menu-item index="/questionnaire" class="nav-menu-item">我的问卷</el-menu-item>
      <el-menu-item index="/authority" class="nav-menu-item" >权限管理</el-menu-item>
      <el-menu-item index="/document" class="nav-menu-item">帮助文档</el-menu-item>
    </el-menu>
    <div class="nav-head-account">
      <!--<img src="../images/account.png" class="nav-head-account-img" @click="goAccount"/>-->
      <router-link class="nav-head-user" to="/account" active-class="is-active">
        <!--{{loginEmail}}-->小邹
      </router-link>
      <a @click="logout" class="nav-head-logout">退出</a>
    </div>
  </header>
</template>

<script>

    export default {
      name: "nav-head",

      data () {
        let activeIndex = '/' + this.$router.currentRoute.path.split('/')[1]
        return {
          activeIndex: activeIndex
        }
      },

      // computed: {
      //   ...mapGetters({
      //     userInfo: 'getUserInfo'
      //   })
      // },

      methods: {

        logout() {

        }
      }
    }
</script>

<style scoped>
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 4rem;
    font-size: 1.5rem;
    line-height: 4rem;
    color: #fff;
    background: #08B456;
    box-sizing: border-box;
    z-index: 1000;
  }

  .header .logo{
    float: left;
    width: 14rem;
    text-align: center;
  }

  .nav-menu-item {
    height: 4rem;
    line-height: 4rem;
    font-size: 1.2rem;
    padding: 0.3rem 1rem;
  }

  .nav-head-account {
    float: right;
    margin-right: 2rem;
    line-height: 4rem;
    text-align: right;
  }

  .nav-head-user {
    margin-right: 1.3rem;
    font-size: 1.2rem;
    color: #FFFFFF;
    line-height: 4rem;
    vertical-align: middle;
  }

  .nav-head-logout {
    color: #FFFFFF;
    cursor: pointer;
    font-size: 1.2rem
  }
</style>
