<template>
  <div class="settings_btn">
    <router-link to="/Settings">
      <img src="../assets/icons/settings.png" alt="Settings">
    </router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'SettingsBtn'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.settings_btn {
  width: 100%;
  background-color: blue;
  /* height: 80px; */
}

img {
  position: absolute;
  margin: 20px 30px;
  right: 0px;
  height: 60px;
  width: 60px;
}

</style>
