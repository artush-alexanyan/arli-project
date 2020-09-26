<template>
  <div id="app">
    <div id="nav">
        <MainNavbar />
    </div>
    <router-view/>
  </div>
</template>

<script>
import MainNavbar from  './app-view/MainNavbar.vue'

export default {
  name: 'App',
  components: { MainNavbar }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
