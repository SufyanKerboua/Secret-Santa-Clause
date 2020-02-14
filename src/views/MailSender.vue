<template>
  <div class="mail_sender">
    <h1>INTO MAIL SENDER {{ name }}</h1>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'MailSender',
  components: {
  },
  props: {
    name: String
  }
}
</script>

<style scoped>

h1 {
  margin: 0;
  font-size: 64px;
  padding: 0;
  padding-top: 50px;
}

</style>