<template>
  <div class="userRigth">
    <div class="avatar">
      <img :src="'http://111.230.149.24:80/images/avatar/'+this.$store.state.userinfo.userinfo.pic" />
    </div>
    <div class="username">
      <p>{{name}}</p>
    </div>

    <div class="counts">
      <div>
        <p>文章</p>
        <p class="count">{{wzLenght}}</p>
      </div>

      <div>
        <p>消息</p>
        <p class="count">{{xxLenght}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "userRigth",
  data() {
    return {
      name: "",
      wzLenght: 0,
      xxLenght: "0"
    };
  },
  mounted() {
    this.name = this.$store.state.userinfo.userinfo.username;
    this.$axios
      .post("/showArticle", {
        userid: this.$store.state.username
      })
      .then(res => {
        this.wzLenght = res.data.data.length;
      })
      .catch(err => {
        console.log(err);
      });

  }
};
</script>

<style scoped>
.userRigth {
  /* border: 1px solid #ccc; */
  width: 100%;
}
.avatar {
  float: left;
  margin: 5px 10px;
}
.avatar img {
  width: 70px;
  height: 70px;
  border-radius: 5px;
  /* border: 2px solid #eee; */
}
.username {
  margin: 10px 5px;
  float: left;
}
.counts {
  width: 55%;
  float: left;
  padding-bottom: 5px;
  margin: 0px 5px 0 5px;
  border-top: 1px solid #ddd;
  padding-top: 8px;
  display: flex;
  justify-content: space-between;
}
.counts div {
  font-size: 14px;
  float: left;
  display: flex;
}
.counts p {
  text-align: center;
}
.count {
  margin-left: 5px;
}
</style>