<template>
  <div class="group_btn_container">
    <img class="delete_btn" src="../assets/delte1.png" @click="deleteGroup()" alt="" srcset="">
    <router-link :to="{ name: 'MailSender', params: { groupObj: this.json_obj }}">
      <div class="group_btn">
        <img class="img_group" src="../assets/gift_icon.png" alt="" srcset="">
        <span>
          <b>
            {{ group_title }}
          </b>
        </span>
      </div>
    </router-link>
  </div>
</template>

<script>
const {ipcRenderer} = require('electron')
export default {
  name: 'GroupBtn',
  props: {
    group_title: String,
    json_obj: Object
  },
  data() {
    return {
      image_delete: '../assets/delte1.png',
      image_delete_hover: '../assets/delte2.png'
    }
  },
  created: function () {
  },
  methods: {
    deleteGroup() {
      console.log("Delete this button");
      ipcRenderer.send('delete-group', this.group_title);
      this.reloadPage();
    },
    reloadPage(){
      this.$parent.reloadGroups();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.group_btn_container {
  padding-bottom: 40px
}

.group_btn {
  margin: 0px;
  height: 150px;
  width: 150px;
  /* padding: 20px; */
  cursor: pointer;
  color: #fff8f8;
  position: relative;
  display: inline-block;
}

.group_btn span {
  font-size: 24px;
  position: absolute;
  z-index: 999;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 45%;
  text-align: center;
  width: 60%;
}

.img_group {
  width: 150px;
  height: 150px;
}

.delete_btn {
  width: 40px;
  position: absolute;
  height: 40px;
  margin: 0px;
  margin-left: 150px;
  margin-top: -20px;
}

.delete_btn:hover {
  display: block;
  cursor: pointer;
}


a {  text-decoration: none;}
</style>
