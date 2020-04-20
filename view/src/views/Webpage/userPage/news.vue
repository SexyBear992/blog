<template>
  <div class="Album">
    <h1>NEWS</h1>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="文章评论" name="first">
        <el-table :data="comment" style="width: 100%">
          <el-table-column prop="articleid.title" label="文章" width="180"></el-table-column>
          <el-table-column prop="username" label="评论人" width="180"></el-table-column>
          <el-table-column prop="content" label="内容"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="回复我的" name="third"></el-tab-pane>
      <el-tab-pane label="系统通知" name="fourth">
        <el-table :data="admin" style="width: 100%">
          <el-table-column prop="articleid.title" label="标题" width="180"></el-table-column>
          <el-table-column prop="content" label="内容"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      comment: [],
      admin: []
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  },
  mounted() {
    this.$axios
      .post("/showUserComment", {
        author: this.$store.state.username
      })
      .then(res => {
        this.comment = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });

    this.$axios
      .post("/showAdmin", {
        userid: this.$store.state.username
      })
      .then(res => {
        this.admin = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
h1 {
  margin: 40px;
}
.el-tabs {
  width: 800px;
  margin-left: 50px;
}
</style>