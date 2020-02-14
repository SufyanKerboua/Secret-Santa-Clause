<template>
  <div class="group_creator_btn">
    <router-link :to="{ name: 'GroupCreator'}">
      <mdb-icon class="text-success btn_plus" icon="plus-circle" size="5x"/>
    </router-link>
  </div>
</template>

<script>
import {mdbIcon} from "mdbvue";

export default {
  name: 'GroupCreatorBtn',
  components: {
    mdbIcon
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
  height: 150px;
  width: 150px;
  background-color: green;
  border: solid red;
  border-radius: 30px;
}

.group_creator_btn .btn_plus {
  text-align: center;
  margin: 30px;
}

a {  text-decoration: none;}
</style>
