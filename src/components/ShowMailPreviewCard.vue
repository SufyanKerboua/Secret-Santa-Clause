<template>
    <div class="show_mail_preview_card">
        <mdb-card>
            <mdb-card-header class="pt-4 amy-crisp-gradient">
                <mdb-card-title>
                    <mdb-icon class="" icon="mail-bulk" size="2x" />
                    <strong> Mail Preview for {{ this.group_name }} group </strong>
                    </mdb-card-title>
            </mdb-card-header>

            <mdb-card-body class="body_group_creation">
              <div class="mail_content" v-html="body"></div>
              <mdb-btn color="primary" @click="sendEmail" rounded>Primary rounded button</mdb-btn>
            </mdb-card-body>
        </mdb-card>
    </div>
</template>

<script>
  const {ipcRenderer} = require('electron')
  import {
    // mdbRow,
    // mdbCol,
    // mdbInput,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    mdbCardHeader,
    mdbCardTitle,
    // mdbCardFooter,
    mdbIcon
  } from "mdbvue";

  export default {
    name: "ShowMailPreviewCard",
    components: {
    //   mdbRow,
    //   mdbCol,
    //   mdbInput,
      mdbBtn,
      mdbCard,
      mdbCardBody,
      mdbCardHeader,
      mdbCardTitle,
    //   mdbCardFooter,
      mdbIcon
    },
    data() {
      return {
          group_name: "",
          participants: [],
          body: ''
      };
    },
    props: {
       groupObj: Object
    },
    mounted() {
        this.group_name = this.groupObj.group_name;
        this.participants = this.groupObj.participants;
        ipcRenderer.send('send-mail-viewer');
        ipcRenderer.on('send-mail-viewer-reply', (event, arg) => {
          this.body = arg;
          console.log(event);
          // alert("No mail saved in Settings, please update your mail on the Settings Page.");
        })
    },
    methods: {
      sendEmail() {
        // let tmpObj = {}
        // tmpObj.from = "SecretSantaClause@mail.com"
        // tmpObj.to = "sufyan.kerboua@epitech.eu"
        let mail = 'Secret Santa Clause <sufyan.kerboua2@mail.dcu.ie>';
        console.log("Mail sender : ", mail);
        ipcRenderer.send('send-mails-2', mail);
        ipcRenderer.on('send-mails-error', (event) => {
          console.log(event);
          alert("No mail saved in Settings, please update your mail on the Settings Page.");
        })
      }
    }
  };
  
</script>


<style scoped>

.show_mail_preview_card {
    text-align: initial;
    margin: 50px;
}

.body_group_creation {
    overflow-y: auto;
    height: 450px;
    max-height: 450px;
}

.btn_add_remove {
    margin: auto;
}

.btn_minus {
    margin: 2px;
}

.btn_plus {
    margin: 2px;
}

.mail_content {
  color: black;
}

</style>