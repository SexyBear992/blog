<template>
  <div class="userLeft">
    <div class="author">
      <div class="avatar">
        <img :src="'http://111.230.149.24:80/images/avatar/'+details.avatar" alt />
      </div>
      <div class="right">
        <div class="username">
          <p>{{details.author}}</p>
        </div>

        <div class="counts">
          <div>
            <p>文章</p>
            <p class="count">{{wzLenght}}</p>
          </div>

          <div>
            <p>关注</p>
            <p class="count">{{gzLenght}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="but">
      <el-button type="danger" plain  v-if="followhide" @click="cancelfollow">已关注</el-button>
      <el-button type="danger" @click="follow" v-else>关注</el-button>
      <el-button type="danger" plain>私信</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "author",
  props: ["details"],

  data() {
    return {
      name: "",
      followhide: "",
      author: "",
      wzLenght: "0",
      gzLenght: "0"
    };
  },
  methods: {
    follow() {
      if (localStorage.getItem("userinfo")) {
        this.$axios
          .post("/follow", {
            userid: this.$store.state.username,
            followid: this.author
          })
          .then(res => {
            this.followhide = !this.followhide;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        alert("请先进行登录");
      }
    },
    cancelfollow() {
      if (localStorage.getItem("userinfo")) {
        this.$axios
          .post("/cancelfollow", {
            userid: this.$store.state.username,
            followid: this.author
          })
          .then(res => {
            this.followhide = !this.followhide;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        alert("请先进行登录");
      }
    }
  },
  watch: {
    details(val) {
      this.author = val.user;
      if (localStorage.getItem("userinfo")) {
        this.$axios
          .post("/checkFollow", {
            userid: this.$store.state.username,
            followid: val.user
          })
          .then(res => {
            this.followhide = res.data.data;
            // console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style scoped>
.userLeft {
  /* border: 1px solid #ccc; */
  width: 100%;
}
.author {
  overflow: hidden;
  margin-left: 10px;
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
}
.counts div {
  font-size: 14px;
  float: left;
  display: flex;
  margin-right: 25px;
}
.counts p {
  text-align: center;
}
.count {
  margin-left: 5px;
}
.but {
  clear: both;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  /* width: 265px; */
}
.el-button {
  padding: 5px 40px;
  font-size: 12px;
}
</style>