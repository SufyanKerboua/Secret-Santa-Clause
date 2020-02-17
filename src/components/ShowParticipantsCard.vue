<template>
    <div class="show_participants_card">
        <mdb-card>
            <mdb-card-header class="pt-4 amy-crisp-gradient">
                <mdb-card-title>
                    <mdb-icon class="" icon="users" size="2x" />
                    <strong> {{ this.group_name }} </strong>
                    </mdb-card-title>
            </mdb-card-header>

            <mdb-card-body class="body_group_creation">

                <form class="mx-3 grey-text md-form">

                    <mdb-row v-for="(participant, k) in participants" :key="k">
                        <mdb-col col=3 class="participant_name">
                            <p><b> {{ participant.participant_name }} </b></p>
                        </mdb-col>

                        <mdb-col col=9>
                            <AutocompleteToken :notAssignedParticipants="participant.not_assigned_participant" :suggestions="participants" filterBy="participant_name"/>
                        </mdb-col>
                        <hr v-show="k != participants.length - 1">
                    </mdb-row>

                </form>
            </mdb-card-body>
            <mdb-card-footer class="white d-flex justify-content-end">
                <mdb-btn gradient="amy-crisp" class="black-text" icon="check" rounded>Create Group</mdb-btn>
            </mdb-card-footer>
        </mdb-card>
    </div>
</template>

<script>
import AutocompleteToken from '@/components/AutocompleteToken.vue'
  import {
    mdbRow,
    mdbCol,
    // mdbInput,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    mdbCardHeader,
    mdbCardTitle,
    mdbCardFooter,
    mdbIcon
    // mdbBadge
  } from "mdbvue";

  export default {
    name: "ShowParticipantsCard",
    components: {
        AutocompleteToken,
      mdbRow,
      mdbCol,
    //   mdbInput,
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
          participants: []
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
    customerSelected(customer) {
      console.log(`Customer Selected:\nid: ${customer.id}\nname: ${customer.name}`);
    },
    onChange(value) {
        console.log(value)
      // do something with the current value
    }
  },
  };
  
</script>


<style scoped>

.show_participants_card {
    text-align: initial;
    margin: 50px;
}

hr {
    width: 100%;
}

.body_group_creation {
    overflow-y: auto;
    max-height: 450px;
    padding-top: 0px;
    padding-bottom: 0px;
}

.participant_name {
    margin: auto;
    padding: 0;
}

.participant_name p b {
    font-size: 20px;
}

.badge_participant {
    font-size: 20px;
}

</style>