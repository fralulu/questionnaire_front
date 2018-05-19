<template>
  <div>
    <nav-head></nav-head>
    <nav-side></nav-side>
    <router-view></router-view>
  </div>
</template>

<script>
    import NavSide from "../components/common/NavSide"
    import NavHead from '../components/common/NavHead'

    export default {
      components: {NavSide, NavHead},

      name: "home"
    }
</script>

<style scoped>

</style>
