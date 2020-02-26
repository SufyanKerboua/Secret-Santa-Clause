<template>
    <div class="show_mail_preview_card">
        <mdb-card>
            <mdb-card-header class="pt-4 amy-crisp-gradient">
                <mdb-card-title>
                    <mdb-icon class="" icon="mail-bulk" size="2x" />
                    <strong> Mail Preview </strong>
                    </mdb-card-title>
            </mdb-card-header>

            <mdb-card-body class="body_group_creation">
              <div class="mail_content">
                <mdb-row>
                  <mdb-col>
                    <mdb-input label="Date" name="date" v-model="date" fas icon="calendar-day" placeholder="Date of the event" type="text"/>
                  </mdb-col>
                </mdb-row>

                <mdb-row>
                  <mdb-col>
                    <mdb-input label="Time" name="time" v-model="time" fas icon="business-time" placeholder="Time of the event" type="text"/>
                  </mdb-col>
                </mdb-row>

                <mdb-row>
                  <mdb-col>
                    <mdb-input label="Places" name="place" v-model="places" icon="map-marked-alt" placeholder="Places of the event" type="text"/>
                  </mdb-col>
                </mdb-row>

              </div>
            </mdb-card-body>

            <mdb-card-footer class="white d-flex justify-content-end">
              <router-link :to="{ name: 'Home'}">
                <mdb-btn class="mail_content" gradient="amy-crisp" icon="paper-plane" @click="sendEmail" rounded>Send Mails</mdb-btn>
              </router-link>
            </mdb-card-footer>
        </mdb-card>
    </div>
</template>

<script>
  const {ipcRenderer} = require('electron')
  import {
    mdbRow,
    mdbCol,
    mdbInput,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    mdbCardHeader,
    mdbCardTitle,
    mdbCardFooter,
    mdbIcon
  } from "mdbvue";

  export default {
    name: "ShowMailPreviewCard",
    components: {
      mdbRow,
      mdbCol,
      mdbInput,
      mdbBtn,
      mdbCard,
      mdbCardBody,
      mdbCardHeader,
      mdbCardTitle,
      mdbCardFooter,
      mdbIcon
    },
    data() {
      return {
          group_name: "",
          participants: [],
          date: '',
          time: '',
          places: ''
      };
    },
    props: {
       groupObj: Object
    },
    mounted() {
        this.group_name = this.groupObj.group_name;
        this.participants = this.groupObj.participants;
    },
    methods: {
      sendEmail() {
        let tmpObj = {
          mailContentBasic: {
            group_name: this.groupObj.group_name,
            date: this.date,
            time: this.time,
            places: this.places
          },
          groupObj: this.groupObj
        }
        console.log("Mail sender : ", tmpObj);
        ipcRenderer.send('send-mails', JSON.stringify(tmpObj));
      }
    }
  };

  ipcRenderer.on('send-mails-error', (event) => {
    console.log(event);
    alert("An error has occured, we couldn't retrieve your e-mail address.");
  })
  
</script>


<style scoped>

.show_mail_preview_card {
  text-align: initial;
  margin: 50px;
}

.body_group_creation {
  overflow-y: auto;
  max-height: 400px;
  padding-top: 0px;
  padding-bottom: 0px;
}

.mail_content {
  color: black;
}

</style>