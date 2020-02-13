<template>
  <div class="home">
    <SettingsBtn/>
    <h1>Secret Santa Clause</h1>
    <GroupManager select_title="Select a group or create one" />
  </div>
</template>

<script>
// @ is an alias to /src
import SettingsBtn from '@/components/SettingsBtn.vue'
import GroupManager from '@/components/GroupManager.vue'

export default {
  name: 'Home',
  components: {
    SettingsBtn,
    GroupManager
  }
}
</script>

<style scoped>

h1 {
  margin: 0;
  font-size: 64px;
  padding: 0;
  padding-top: 50px;
}

</style>
