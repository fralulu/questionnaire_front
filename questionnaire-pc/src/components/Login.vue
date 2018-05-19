<template>
  <div class="login-wrap">
    <div class="login-main">
      <div class="login-form-top" v-show="loginFormTop"></div>
      <div class="login-form">
        <h1>著名问卷系统</h1>
        <div class="head">
          <img src="../assets/avatar.png" alt=""/>
        </div>
        <div class="login-content">
          <el-tabs v-model="activeName" @tab-click="handleTabClick" type="border-card" class="content-tab">
            <el-tab-pane label="登录" name="login">
              <el-form class="form">
                <el-form-item>
                  <el-input v-model="username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button class="login-btn" @click="login">登录</el-button>
                </el-form-item>
                <div class="forget-password">
                  <el-button type="text" @click="forget">忘记密码？</el-button>
                </div>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="注册" name="register">
              <el-form class="form">
                <el-form-item>
                  <el-input v-model="username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="password2" placeholder="请再次输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button class="login-btn" @click="register">注册</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import fetch from '../fetch/index'
    import { mapGetters } from 'vuex'

    export default {
      name: "login",

      data() {
        return {
          activeName: 'login',
          username: '',
          password: '',
          password2: '',
          loginFormTop: true
        }
      },

      computed: {
        ...mapGetters({
          token: 'getToken'
        })
      },

      mounted() {

      },

      methods: {
        login() {
          fetch.fetchPost('http://rap2api.taobao.org/app/mock/13375//login', {username: this.username, password: this.password}).then(res => {
            this.$store.dispatch('updateToken', {token: true})
            this.$router.push('/')
            console.log(this.token)
          }).catch(res => {
            console.log(res)
          })
        },

        register() {

        },

        forget() {

        },

        handleTabClick(tab, event) {

        }
      }
    }
</script>

<style scoped>
  .login-wrap {
    height: 100vh;
    min-height: 730px;
    background: url("../assets/background.jpg");
  }

  .login-main {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .login-form-top{
    height: 1px;
    width: 100%;
  }

  .login-form {
    background: #eee;
    width: 26%;
    margin: 9% auto 4% auto;
    position: relative;
    -webkit-border-radius: 0.4em;
    -o-border-radius: 0.4em;
    -moz-border-radius: 0.4em;
  }

  .login-main h1{
    padding-top: 19%;
    text-align: center;
    font-size:25px;
    font-family: 'Open Sans', sans-serif;
    font-weight:400;
    color:#676767;
  }

  .head {
    position: absolute;
    top:-15%;
    left: 35%;
  }

  .head img {
    border-radius:50%;
    -webkit-border-radius:50%;
    -o-border-radius:50%;
    -moz-border-radius:50%;
    border:6px solid rgba(221, 218, 215, 0.23);
  }

  .login-content {
    min-height: 24rem;
    margin: 6%;
  }

  .form {
    width: 80%;
    margin: 0 auto;
    padding: 6% 0 2% 0;
  }

  .login-btn{
    color: #21A957;
    width: 100%;
  }

  .forget-password{
    text-align: right;
  }

  @media (max-width:1440px){
    .login-form {
      width:30%;
      margin: 11% auto 4% auto;
    }
    .login-main h1 {
      padding-top: 23%;
    }
  }

  @media (max-width:1366px){
    .login-form {
      width: 32%;
      margin: 10% auto 4% auto;
    }
  }

  @media (max-width:1280px){
    .login-form {
      width: 34%;
      margin: 8% auto 0;
    }
  }

  @media (max-width:1024px){
    .login-form {
      width: 45%;
      margin: 12% auto 0;
    }
    .head img {
      width: 90%;
    }
  }

  @media (max-width:768px){
    .login-form  {
      width: 59%;
      margin: 16% auto 0;
    }
    .head {
      top: -15%;
      left: 30%;
    }
    .head img {
      width: 85%;
    }
  }

  @media (max-width:480px){
    .login-form {
      width: 74%;
      margin: 32% auto 0;
    }
    .login-main h1 {
      font-size: 22px;
    }
    .head {
      top: -15%;
      left: 34%;
    }
    .head img {
      width: 68%;
    }
  }

  @media (max-width:320px) {
    .login-form {
      margin: 20% auto 0;
      width: 85%;
    }
    .login-main h1 {
      padding-top: 20%;
      font-size: 20px;
    }
    .head {
      top: -15%;
      left: 36%;
    }
    .head img {
      width: 60%;
      border: 5px solid rgba(221, 218, 215, 0.23);
    }
  }

</style>
