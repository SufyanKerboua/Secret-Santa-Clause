<template>
  <div class="home">
    <SettingsBtn/>
    <h1>Secret Santa Clause</h1>
    <h3>Select a group or create one.</h3>
    <div class="group-container">
      <b-container>
        <b-row>
          <b-col cols="4" v-for="(jsonGroup, i) in jsonGroups" :key="i">
            <GroupBtn :group_title="jsonGroup.group_name" :json_obj="jsonGroup"/>
          </b-col>
          <b-col cols="4">
            <GroupCreatorBtn/>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SettingsBtn from '@/components/SettingsBtn.vue'
import GroupBtn from '@/components/GroupBtn.vue'
import GroupCreatorBtn from '@/components/GroupCreatorBtn.vue'
const {ipcRenderer} = require('electron')

let vm;

export default {
  name: 'Home',
  components: {
    SettingsBtn,
    GroupBtn,
    GroupCreatorBtn
  },
  data() {
    return {
      jsonGroups: {}
    }
  },
  watch: {
    jsonGroups: function(value) {
      this.jsonGroups = value;
    }
  },
  created: function () {
    vm = this;
    ipcRenderer.send('get-json-group');
  },
  methods: {
    reloadGroups() {
      ipcRenderer.send('get-reloaded-json-group');
    }
  }
}

ipcRenderer.on('get-json-group-reply', (event, param) => {
  vm.jsonGroups = JSON.parse(param)
  console.log("Json groups : ", vm.jsonGroups)
})

</script>

<style scoped>

.home {
  color: white;
}

h1 {
  margin: 0;
  font-size: 64px;
  padding: 0;
  padding-top: 50px;
  padding-bottom: 20px;
}

.group-container {
  height: 450px;
  padding-top: 30px;
  overflow-y: auto;
}

</style>
