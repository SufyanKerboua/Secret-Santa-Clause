<template>
    <div class="form_group_card">
        <mdb-card>

            <mdb-card-body class="body_group_creation">
                <form class="mx-3 grey-text md-form">

                    <mdb-row>
                        <mdb-col col=4>
                        </mdb-col>
                        <mdb-col col=4>
                            <mdb-input label="Group Name" name="group_name" placeholder="Choose a group name" icon="users" size="lg" type="text"
                            @input="handleInputGroupName($event)"/>
                        </mdb-col>
                        <mdb-col col=4>
                        </mdb-col>
                    </mdb-row>

                    <mdb-row v-for="(participant, k) in participants" :key="k">
                        <mdb-col>
                            <mdb-input label="Participant" name="participant_name" :value="participant.participant_name" icon="user" placeholder="Participant name" type="text"
                            @input="handleInputName($event, k)"/>
                        </mdb-col>

                        <mdb-col>
                            <mdb-input name="mail" :value="participant.mail"  label="Mail" icon="mail-bulk" type="text" placeholder="Mail of participant" 
                            @input="handleInputMail($event, k)"/>
                        </mdb-col>

                        <mdb-col col="1" class="btn_add_remove">
                            <mdb-icon v-add-class-hover="'fas'" class="text-muted btn_minus" far icon="trash-alt" size="lg" @mouseover="isHovering = true" @mouseout="isHovering = false" @click.native="removeParticipant(k)" v-show="k || ( !k && participants.length > 1)" />
                            <mdb-icon v-add-class-hover="'text-success'" class="hovering_plus btn_plus" icon="plus-circle" size="lg" @click.native="addParticipant()" v-show="k == participants.length -1" />
                        </mdb-col>
                    </mdb-row>

                </form>
            </mdb-card-body>

            <mdb-card-footer class="white d-flex justify-content-end">
                <router-link :to="{ name: 'Home'}">
                    <mdb-btn gradient="amy-crisp" class="black-text" icon="paper-plane" @click.native="generateGroupJSON()" rounded>Create Group</mdb-btn>
                </router-link>
            </mdb-card-footer>
        </mdb-card>
    </div>
</template>

<script>
  import {
    mdbRow,
    mdbCol,
    mdbInput,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    mdbCardFooter,
    mdbIcon
  } from "mdbvue";
  const {ipcRenderer} = require('electron')

  export default {
    name: "FormGroupCard",
    components: {
      mdbRow,
      mdbCol,
      mdbInput,
      mdbBtn,
      mdbCard,
      mdbCardBody,
      mdbCardFooter,
      mdbIcon
    },
    data() {
      return {
          group_name: "",
          participants: [{participant_name:'', mail: ''}],
          isHovering: false
      };
    },
    methods: {
        handleInputName(val, index) {
            this.participants[index].participant_name = val;
        },
        handleInputMail(val, index) {
            this.participants[index].mail = val;
        },
        handleInputGroupName(val) {
            this.group_name = val;
        },
        addParticipant() {
            this.participants.push({
                participant_name: '',
                mail: ''
            });
        },
        removeParticipant(index) {
            console.log("Index participant : ", index)
            this.participants.splice(index, 1);
        },
        generateGroupJSON() {
            let groupObjJson = {};
            groupObjJson.group_name = this.group_name;
            groupObjJson.participants = [];

            this.participants.forEach(element => {
                let tmpObj = {};
                tmpObj.participant_name = element.participant_name;
                tmpObj.mail = element.mail;
                tmpObj.not_assigned_participant = [ element.participant_name ]
                groupObjJson.participants.push(tmpObj);
            });

            console.log("GroupObjJson : ", groupObjJson);

            ipcRenderer.send('create-json-group', JSON.stringify(groupObjJson));
        }
    }
  };
  
</script>


<style scoped>

.form_group_card {
    text-align: initial;
    margin: 50px;
}

.body_group_creation {
    overflow-y: auto;
    max-height: 450px;
    padding-top: 0px;
}

.btn_add_remove {
    margin: auto;
    padding: 0px;
    padding-left: 15px;
}

.btn_minus {
    margin: 2px;
    cursor: pointer
}

.btn_plus {
    margin: 2px;
    cursor: pointer
}

.hovering_plus {
  color: #28a745;
}

</style>