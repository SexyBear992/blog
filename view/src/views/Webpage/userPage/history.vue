<template>
  <div class="history">
    <div class="hear">
      <h1>HISTORY</h1>
      <el-button type="text" @click="open" icon="el-icon-delete">清空历史</el-button>
    </div>

    <div class="block">
      <el-timeline>
        <el-timeline-item
          v-for="(item,i) in his"
          :key="i"
          :timestamp="item.time|dateFormat()"
          placement="top"
        >
          <el-card v-if="item.articleid">
            <router-link :to="'/myDetails?id='+item.articleid._id">
              <p class="title" @click="articleSee(item.articleid._id)">{{item.articleid.title}}</p>
            </router-link>
            <div class="newsBox">
              <div class="pic">
                <router-link :to="'/myDetails?id='+item.articleid._id">
                  <img
                    :src="'http://111.230.149.24:80/images/pic/'+item.articleid.pic"
                    alt
                    @click="articleSee(item.articleid._id)"
                  />
                </router-link>
              </div>
              <div class="text">
                <router-link :to="'/myDetails?id='+item.articleid._id" class="textContent">
                  <span @click="articleSee(item.articleid._id)" v-html="item.articleid.content"></span>
                </router-link>
                <router-link :to="'/myDetails?id='+item.articleid._id" class="read">
                  <span @click="articleSee(item.articleid._id)">阅读全文</span>
                </router-link>
              </div>
            </div>

            <div class="del">
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="del(item.articleid._id)"
              ></el-button>
              <!-- <el-button type="text" @click="open" icon="el-icon-delete"></el-button> -->
            </div>
          </el-card>
          <el-card v-else>
            <p class="newsBox">文章已经被删除</p>
            <div class="del">
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="del(item.articleid._id)"
              ></el-button>
              <!-- <el-button type="text" @click="open" icon="el-icon-delete"></el-button> -->
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  name: "history",
  data() {
    return {
      reverse: true,
      his: []
    };
  },
  methods: {
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
    open() {
      this.$alert("清空之后就什么都没有了哦~", "", {
        confirmButtonText: "确定清除",
        callback: action => {
          this.$message({
            type: "info",
            message: "已清空历史"
          });
          this.$axios
            .post("/delAllSee", {
              userid: this.$store.state.username
            })
            .then(res => {
              // console.log(res);
              this.$router.go(0);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    del(aid) {
      var index = this.his.findIndex(item => {
        var delid = item.articleid._id;
        // console.log(aid);

        if (delid == aid) {
          return true;
        }
      });
      this.his.splice(index, 1);
      this.$axios
        .post("/delSee", {
          userid: this.$store.state.username,
          articleid: aid
        })
        .then(res => {
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.$axios
      .post("/showSee", {
        userid: this.$store.state.username
      })
      .then(res => {
        this.his = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  },

};
</script>

<style scoped>
.history {
  background-color: #fff;
}
h1 {
  margin: 40px;
}
.block {
  /* width: 200px; */
  margin: 40px;
  margin-top: 0;
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
.pic {
  float: left;
  margin-right: 20px;
}
.pic img {
  width: 150px;
}
.title {
  width: 85%;
  font-size: 18px;
  font-weight: 600;
}
.text {
  max-height: 100px;
  width: 65%;
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
  float: left;
  margin: 20px;
  width: 9%;
  text-align: center;
  line-height: 50px;
}
.el-button--danger {
  background-color: #fff;
  border: none;
  color: #000;
}
.el-button--text {
  margin-left: 790px;
}
>>> .textContent img {
  display: none;
}
</style>