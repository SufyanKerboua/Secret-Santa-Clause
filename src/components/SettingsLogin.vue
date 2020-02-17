<template>
  <div class="settings_login">
    <mdb-card>
      <mdb-card-body class="body_group_creation">
      </mdb-card-body>
    </mdb-card>
  </div>
</template>

<script>

  import {
    // mdbRow,
    // mdbCol,
    // mdbInput,
    mdbCard,
    mdbCardBody,
  } from "mdbvue";


export default {
  name: 'SettingsLogin',
  components: {
    //   mdbRow,
    //   mdbCol,
    //   mdbInput,
      mdbCard,
      mdbCardBody,
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
