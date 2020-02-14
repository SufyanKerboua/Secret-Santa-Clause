<template>
  <router-link :to="{ name: 'MailSender', params: { props: this.json_obj }}">
    <div class="group_btn">
      <span>
        {{ group_title }}
      </span>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'GroupBtn',
  props: {
    group_title: String,
    json_obj: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.group_btn {
  margin: auto;
  margin-top: 25px;
  margin-bottom: 25px;
  height: 150px;
  width: 150px;
  background-color: blue;
  border: solid red;
  border-radius: 30px;
  padding: 20px;
  cursor: pointer;
}

.group_btn span {
  text-align: center;
  margin: auto;
  padding: auto;
}
</style>
