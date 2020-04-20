<template>
  <div class="popularRight">
    <router-link to="/user/collection">
      <div class="sc badge">
        <span>我的收藏</span>
        <span class="count">{{scLenght}}</span>
      </div>
    </router-link>

    <router-link to="/user/news">
      <div class="hf badge">
        <span>回复我的</span>
        <span class="count">{{hfLenght}}</span>
      </div>
    </router-link>

    <router-link to="/user/news">
      <div class="xx badge">
        <span>我的消息</span>
        <span class="count">{{xxLenght}}</span>
      </div>
    </router-link>

    <router-link to="/user/news">
      <div class="tz badge">
        <span>系统通知</span>
        <span class="count">{{tzLenght}}</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "popularRight",
  data() {
    return {
      scLenght: 0,
      hfLenght: "0",
      xxLenght: "0",
      tzLenght: "0"
    };
  },
  mounted() {
    this.$axios
      .post("/showCollect", {
        userid: this.$store.state.username
      })
      .then(res => {
        this.scLenght = res.data.data.length;
      })
      .catch(err => {
        console.log(err);
      });
    this.$axios
      .post("/showUserComment", {
        author: this.$store.state.username,
      })
      .then(res => {
        console.log(res);
        
        this.hfLenght = res.data.data.length;
      })
      .catch(err => {
        console.log(err);
      });
    this.$axios
      .post("/showAdmin", {
        userid: this.$store.state.username
      })
      .then(res => {
        this.tzLenght = res.data.data.length
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.popularRight {
  /* width: 100%; */
  height: 300px;
  /* background-color: #fff */
}
.badge {
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 32px;
  color: #8590a6;
}
.count {
  margin-right: 10px;
}
a {
  text-decoration: none;
}
a :hover {
  background-color: #fff;
}
</style>