<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
<style type="css">
  @import "./main.css";
  @import "../static/css/color-dark.css";   /*深色主题*/
  /*@import "../static/css/color-green.css";   !*浅绿色主题*!*/
</style>
