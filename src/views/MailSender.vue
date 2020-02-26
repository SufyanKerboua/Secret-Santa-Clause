<template>
  <div class="mail_sender">
    <h1>{{ groupObj.group_name }}</h1>
    <mdb-container fluid>

      <mdbRow>
          <mdbCol col=6>
            <ShowParticipantsCard :groupObj="this.groupObj"/>
          </mdbCol>
          <mdbCol col=6>
            <ShowMailPreviewCard :groupObj="this.groupObj"/>
          </mdbCol>
      </mdbRow>
    </mdb-container>


  </div>
</template>

<script>
// @ is an alias to /src
import ShowParticipantsCard from '@/components/ShowParticipantsCard.vue'
import ShowMailPreviewCard from '@/components/ShowMailPreviewCard.vue'

import { mdbRow, mdbCol, mdbContainer } from "mdbvue";

export default {
  name: 'MailSender',
  components: {
    ShowParticipantsCard,
    ShowMailPreviewCard,
    mdbRow,
    mdbCol,
    mdbContainer
  },
  props: {
    groupObj: Object
  }
}
</script>

<style scoped>

.mail_sender {
  color: white;
}

h1 {
  margin: 0;
  font-size: 64px;
  padding: 0;
  padding-top: 50px;
}

</style>