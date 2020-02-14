<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <LogoHomeBtn/>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import LogoHomeBtn from '@/components/LogoHomeBtn.vue'


export default {
  name: 'App',
  components: {
    LogoHomeBtn
  },
  props: {
    name: String
  }
}
</script>

<style>

body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
}

#app {
  position: relative;
  text-align: center;
  height: 100%;
  color: #2c3e50;
  background-image: url("assets/background_secret_santa.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow-y: auto;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

</style>
