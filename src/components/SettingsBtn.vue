<template>
  <div class="settings_btn">
      <img src="../assets/icons/settings.png" alt="Settings" @click="openPopup">
    <router-view/>
  </div>
</template>

<script>
const {ipcRenderer} = require('electron')

export default {
  name: 'SettingsBtn',
  methods: {
    openPopup() {
      ipcRenderer.send('open-settings-pop-up');
    }
  }
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
