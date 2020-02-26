<template>
  <div class="settings">
    <h1>Settings</h1>
    <mdb-container class="settings_card">
      <mdb-card class="my_card">
          <mdb-icon class="icon_mail" icon="mail-bulk" size="4x" />
          <mdb-card-body class="body_group_creation">
              <mdb-row>
                  <mdb-col>
                      <mdb-input class="input_css" label="Mail" name="mail" placeholder="Please enter your e-mail" size="lg" type="text"
                      v-model="userMail"/>
                  </mdb-col>
              </mdb-row>

          </mdb-card-body>

          <mdb-btn gradient="amy-crisp" class="black-text" icon="check" rounded @click="sendAndClosePopup">Save E-mail</mdb-btn>

      </mdb-card>
    </mdb-container>
  </div>
</template>

<script>
// @ is an alias to /src
// const {ipcRenderer} = require('electron')

import {
  mdbRow,
  mdbCol,
  mdbInput,
  mdbBtn,
  mdbCard,
  mdbCardBody,
  mdbContainer,
  mdbIcon
} from "mdbvue";

export default {
  name: 'Settings',
  data() {
    return {
      userMail: ""
    };
  },
  components: {
    mdbRow,
    mdbCol,
    mdbInput,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    mdbContainer,
    mdbIcon
  },
  mounted: function() {
    console.log("get data , ", this.$route.query.userMail);
    this.userMail = this.$route.query.userMail;
  },
  methods: {
    sendAndClosePopup() {
    },
    handleInputMail(val) {
        this.userMail = val;
    }
  }
}
</script>


<style>

#logoBtn {
  display: none;
}
#app {
  background-color: black;
  background-image: url("../assets/settings2.jpg");
}
</style>


<style scoped>

h1 {
  margin: 0;
  font-size: 52px;
  padding: 0;
  padding-top: 50px;
  color: white;
}

.settings_card {
  margin-top: 50px;
}

.icon_mail {
  margin: 20px;
  margin-top: 50px;
}

.my_card {
  height: 350px;
  padding: 10px;
  margin: 10px;
}

.input_css {
  margin: auto;
  margin-top: 30px;
}
</style>
