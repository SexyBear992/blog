<template>
  <div class="noLoginRight">
    <div class="box">登录账号可查看信息</div>
  </div>
</template>

<script>
export default {
  name: "noLoginRight",
  data() {
    return {
      drawerLog: false
    };
  }
};
</script>
<style  scoped>
.box{
  width: 100%;
  height: 100px;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 100px;
  color: #777;
  border-radius: 5px;
}
</style>