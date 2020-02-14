<template>
  <div class="mail_sender">
    <h1>{{ groupObj.group_name }}</h1>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'MailSender',
  components: {
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