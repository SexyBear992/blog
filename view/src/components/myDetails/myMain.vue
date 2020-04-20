<template>
  <div class="myMain">
    <h1>{{details.title}}</h1>
    <div class="time">
      最后发布于{{details.time}}
      <button
        class="el-icon-star-off col"
        @click="col"
        ref="col"
        v-if="iconCol"
      >收藏</button>
      <button class="el-icon-star-on col" @click="col" ref="col" v-else>收藏</button>
    </div>
    <div class="text" v-html="details.content"></div>
  </div>
</template>
<script>
export default {
  name: "myMain",
  props: ["details"],
  data() {
    return {
      iconCol: true
    };
  },
  methods: {
    col() {
      if (localStorage.getItem("userinfo")) {
        if (this.iconCol === true) {
          this.$axios
            .post("/collect", {
              userid: this.$store.state.username,
              articleid: this.$route.query.id
            })
            .then(res => {
              this.iconCol = !this.iconCol;
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$axios
            .post("/cancelCollect", {
              userid: this.$store.state.username,
              articleid: this.$route.query.id
            })
            .then(res => {
              this.iconCol = !this.iconCol;
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else {
        alert("请先进行登录");
      }

      // this.iconCol = !this.iconCol;
    }
  },
  mounted() {
    // console.log(this.$route.query.id);
    if (localStorage.getItem("userinfo")) {
      this.$axios
        .post("/checkCollect", {
          userid: this.$store.state.username,
          articleid: this.$route.query.id
        })
        .then(res => {
          if (res.data.data.length === 0) {
            this.iconCol = true;
          } else {
            this.iconCol = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
h1 {
  margin: 10px;
}
.time {
  font-size: 13px;
  margin: 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.col {
  color: #ff700a;
  font-size: 16px;
  cursor: pointer;
  border: none;
  outline: none;
  background: transparent;
}
.text {
  margin: 10px;
}
</style>