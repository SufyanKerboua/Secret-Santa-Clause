<template>
  <router-link :to="{ name: 'GroupCreator'}">
    <div class="group_creator_btn">
      <span>
          +
      </span>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'GroupCreatorBtn',
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

.group_creator_btn span {
  text-align: center;
  margin: auto;
  padding: auto;
}

.group_creator_btn span {
  /* font: bold; */
  font-size: 80px;
}
</style>
