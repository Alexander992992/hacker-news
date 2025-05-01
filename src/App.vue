<template>
  <div id="app">
    <main-header/>
    <router-view></router-view>
  </div>
</template>

<script>
import MainHeader from './MainHeader'

export default {
  components: { MainHeader }
}
</script>

<style scoped>

</style>