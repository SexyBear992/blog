<template>
  <div class="user">
    <div class="bigBox">
      <div class="leftBox">
        <leftNav ref="leftNav" />
      </div>

      <div class="rightBox"  :style='{marginLeft:RBWidth}'>
        <router-view />
      </div>
    </div>
  </div>
</template>


<script>
import leftNav from "@/components/user/leftNav";

export default {
  name: "user",
  components: {
    leftNav
  },
  data() {
    return {
      RBWidth:''
    }
  },
  mounted() {
    this.RBWidth = Number(this.$refs.leftNav.leftNavWidth) + 'px'
    
    
  }
};
</script>
<style scoped>

</style>
