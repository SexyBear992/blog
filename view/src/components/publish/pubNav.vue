<template>
  <div class="pubNav">
    <el-menu class="el-menu-demo" mode="horizontal">
      <el-menu-item class="logo">
        <router-link to="/">BLOG</router-link>
      </el-menu-item>
      <el-menu-item>|</el-menu-item>
      <el-menu-item>写文章</el-menu-item>
      <el-menu-item class="right" @click="publish">
        <el-button>发表</el-button>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "pubNav",
  props: ["titlep", "contentp", "pic"],
  data() {
    return {};
  },
  mounted() {
    console.log();
  },
  methods: {
    publish() {
      if (this.$route.query.id) {
        this.$axios
          .post("/updateArticle", {
            articleid: this.$route.query.id,
            title: this.titlep,
            content: this.contentp,
            pic: this.pic
          })
          .then(res => {
            alert("修改文章成功");
            this.$router.go(-1);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        if (this.titlep != "" && this.contentp != "") {
          this.$axios
            .post("/publish", {
              title: this.titlep,
              content: this.contentp,
              pic: this.pic,
              username: this.$store.state.username
            })
            .then(res => {
              alert("发表成功");
            })
            .catch(err => {
              console.log(err);
            });
          this.$router.go(-1);
        } else {
          alert("发表失败");
        }
      }
    }
  }
};
</script>

<style scoped>
.pubNav {
  height: 60px;
}
a {
  text-decoration: none;
}
.el-menu-demo {
  width: 950px;
  margin: 0 auto;
}
.logo {
  font-weight: 600;
  font-size: 18px;
}
.right {
  float: right;
}
</style>