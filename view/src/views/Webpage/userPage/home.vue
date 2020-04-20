<template>
  <div class="home">
    <!-- <register /> -->
    <h1>我的文章</h1>
    <h1>我的收藏</h1>
    <h1>我的好友</h1>
  </div>
</template>

<script>
import register from "@/components/index/register.vue";
export default {
  name: "home",
  components: {
    register
  }
};
</script>

<style scoped>
h1 {
  margin: 40px;
}
</style>