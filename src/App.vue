<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style>

body {
  margin: 0;
  padding: 0;
  width: 1000px;
  height: 678px;
}

#app {
  position: relative;
  text-align: center;
  height: 100%;
  color: #2c3e50;
  /* background-image: url("assets/wallpaper_secret_santa.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%; */

  background-color: #252525!important;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

</style>
