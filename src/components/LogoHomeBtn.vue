<template>
  <router-link :to="{ name: 'Home'}">
    <div class="logo_home_btn">
      <img id="logoBtn" src="../assets/logo_scc.png" alt="Home">
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'LogoHomeBtn',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

img {
  position: absolute;
  margin: 20px 30px;
  left: 0px;
  height: 120px;
  width: 120px;
}
</style>
