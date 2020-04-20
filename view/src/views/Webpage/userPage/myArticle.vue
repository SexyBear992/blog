<template>
  <div class="myArticle">
    <div class="hear">
      <h1>ARTICLE</h1>
    </div>

    <div class="block">
      <el-timeline>
        <el-timeline-item
          v-for="(i,index) in activities"
          :key="index"
          placement="top"
          :timestamp="i.time|dateFormat() + ' 发布'"
        >
          <el-card>
            <div class="del">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <router-link :to="'/publish?id='+i._id">
                    <el-dropdown-item>编辑</el-dropdown-item>
                  </router-link>
                  <el-dropdown-item>
                    <el-popconfirm title="确定删除文章？" :hideIcon="true" @onConfirm="delart(i._id)">
                      <el-button slot="reference">删除文章</el-button>
                    </el-popconfirm>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <!-- -->
            </div>
            <router-link :to="'/myDetails?id='+i._id">
              <p class="title" @click="articleSee(i._id)">{{i.title}}</p>
            </router-link>
            <div class="newsBox">
              <div class="text">
                <router-link :to="'/myDetails?id='+i._id" class="textContent">
                  <span v-html="i.content" @click="articleSee(i._id)"></span>
                </router-link>
                <router-link :to="'/myDetails?id='+i._id" class="read">
                  <span @click="articleSee(i._id)">阅读全文</span>
                </router-link>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>

    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        current-page.sync="1"
        :page-size="5"
        layout="prev, pager, next, jumper"
        :hide-on-single-page="true"
        :total="activitiesLen"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "myArticle",
  data() {
    return {
      reverse: true,
      activities: [],
      activitiesLen: 0
    };
  },
  methods: {
    delart(id) {
      console.log(id);
      console.log(this.$store.state.username);

      this.$axios
        .post("/delArticle", {
          articleid: id,
          userid: this.$store.state.username
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      var index = this.activities.findIndex(item => {
        var activitiesid = item._id;
        // console.log(aid);
        if (activitiesid == id) {
          return true;
        }
      });
      this.activities.splice(index, 1);
    },

    articleSee(aid) {
      this.$axios
        .post("/articleSee", {
          articleid: aid,
          userid: this.$store.state.username
        })
        .then(res => {
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
      this.$axios
        .post("/showArticle", {
          userid: this.$store.state.username,
          pag: val - 1
        })
        .then(res => {
          this.activities = res.data.data;
          console.log(res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.$axios
      .post("/showArticle", {
        userid: this.$store.state.username,
        pag: 0
      })
      .then(res => {
        this.activities = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });

    this.$axios
      .post("/showArticle", {
        userid: this.$store.state.username
      })
      .then(res => {
        this.activitiesLen = res.data.data.length;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.myArticle {
  background-color: #fff;
}
h1 {
  margin: 40px;
}
.block {
  /* width: 200px; */
  margin: 0 40px;
}
.el-timeline-item {
  width: 840px;
}

a {
  text-decoration: none;
  color: #000;
}
.newsBox {
  width: 85%;
  margin: 20px 0;
  overflow: hidden;
  float: left;
}
.like {
  float: left;
  margin-right: 20px;
  cursor: pointer;
  padding: 0 10px;
  height: 20px;
  border-radius: 3px;
  background-color: #eff6fa;
  text-align: center;
  line-height: 20px;
  color: #698ebf;
}
.like:hover {
  color: #fff;
  background-color: #698ebf;
}
.title {
  width: 85%;
  font-size: 18px;
  font-weight: 600;
}
.text {
  max-height: 100px;
  width: 85%;
  padding-left: 5px;
  float: left;
  font-size: 15px;
  line-height: 25px;
}
.textContent {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}
.read {
  color: rgb(23, 81, 153);
}
.del {
  float: right;
}
.el-button--danger {
  background-color: #fff;
  border: none;
  color: #000;
}
.el-button--text {
  margin-left: 790px;
}
.el-button--default {
  border: none;
  padding: 0;
}
.pagination {
  width: 950px;
}
.el-pagination {
  margin-left: 300px;
  margin-bottom: 20px;
}
>>> .textContent img {
  display: none;
}
>>> .el-timeline-item__tail {
  display: none;
}
>>> .el-timeline-item__node--normal {
  display: none;
}
</style>