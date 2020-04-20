<template>
  <div class="admin">
    <div class="topNav">
      <router-link to='/' class="home">
        <span>首页</span>
      </router-link>
      <router-link to class="out">
        <span @click="out">退出</span>
      </router-link>
    </div>

    <el-table :data="articles" style="width: 100%">
      <el-table-column label="日期" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.time |dateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" width="200">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>作者: {{ scope.row.author }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.title }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="内容" width="400">
        <template slot-scope="scope">
          <el-tag size="medium" v-html="scope.row.content"></el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "admin",
  data() {
    return {
      articles: []
    };
  },
  mounted() {
    this.$axios
      .post("/showArticle")
      .then(res => {
        this.articles = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    handleDelete(index, row) {
      this.$axios
        .post("/delArticle", {
          articleid: row._id,
          userid: this.$store.state.username,
          author: row.author
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    out() {
      localStorage.removeItem("userinfo");
      alert("退出管理员成功");
      this.$router.push("/");
    },
  }
};
</script>

<style scoped>
.topNav {
  width: 100%;
  height: 56px;
  background-color: rgb(84, 92, 100);
}
a {
  text-decoration: none;
  color: #fff;
}
.home {
  line-height: 56px;
  padding-left: 50px;
}
.out {
  float: right;
  line-height: 56px;
  padding-right: 50px;
}
.el-table {
  width: 900px !important;
  margin: 20px auto;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
>>> .cell img {
  display: none;
}
</style>