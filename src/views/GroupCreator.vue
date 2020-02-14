<template>
  <div class="group_creator">
    <h1> <b> Group creator</b></h1>
    <FormsPage/>
  </div>
</template>

<script>
// @ is an alias to /src
import FormsPage from '@/components/FormsPage.vue'


export default {
  name: 'GroupCreator',
  components: {
    FormsPage
  }
}
</script>

<style scoped>

h1 {
  margin: 0;
  font-size: 64px;
  padding: 0;
  padding-top: 50px;
  color: white;
}

</style>
