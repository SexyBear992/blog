<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
    if (localStorage.getItem("userinfo")) {
      var userinfo = JSON.parse(localStorage.getItem("userinfo"));
      this.$store.state.userinfo = userinfo;
      this.$store.state.username = userinfo.userid;
    }
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
ul li {
  list-style: none;
}
.el-menu--horizontal {
  margin-left: -63px;
}
.el-menu--horizontal > .el-submenu:focus .el-submenu__title,
.el-menu--horizontal > .el-submenu:hover .el-submenu__title {
  background-color: rgb(84, 92, 100) !important;
}
</style>
