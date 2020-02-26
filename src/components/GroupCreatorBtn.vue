<template>
  <div class="group_creator_btn">
    <router-link :to="{ name: 'GroupCreator'}">
      <img class="img_group text-success" src="../assets/add_group_icon.png" alt="" srcset="">
      <!-- <mdb-icon class="text-success btn_plus" icon="plus-circle" size="5x"/> -->
    </router-link>
  </div>
</template>

<script>
// import {mdbIcon} from "mdbvue";

export default {
  name: 'GroupCreatorBtn',
  components: {
    // mdbIcon
    },
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.group_creator_btn {
  margin: auto;
  margin-top: 25px;
  margin-bottom: 25px;
  height: 170px;
  width: 170px;
  /* background-color: green; */
  border: 2px solid #500000;
  border-radius: 30px;
}

.group_creator_btn .btn_plus {
  text-align: center;
  margin: 30px;
}

a {  text-decoration: none;}
</style>
