<template>
  <div class="collection">
    <div class="hear">
      <h1>COLLECTION</h1>
    </div>

    <div class="block">
      <el-timeline>
        <el-timeline-item v-for="(item,i) in col" :key="i" placement="top">
          <el-card v-if="item.articleid">
            <router-link :to="'/myDetails?id='+item.articleid._id">
              <p class="title" @click="articleSee(item.articleid._id)">{{item.articleid.title}}</p>
            </router-link>
            <div class="newsBox">
              <div class="see">{{item.articleid.see}}</div>
              <div class="text">
                <router-link :to="'/myDetails?id='+item.articleid._id" class="textContent">
                  <span @click="articleSee(item.articleid._id)" v-html="item.articleid.content"></span>
                </router-link>
                <router-link :to="'/myDetails?id='+item.articleid._id" class="read">
                  <span @click="articleSee(item.articleid._id)">阅读全文</span>
                </router-link>
              </div>
            </div>

            <div class="col">
              <el-popconfirm
                title="确定取消收藏？"
                :hideIcon="true"
                @onConfirm="delcol(item.articleid._id)"
              >
                <el-button slot="reference">取消收藏</el-button>
              </el-popconfirm>
            </div>
          </el-card>
          <el-card v-else>文章已经被删除</el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  name: "collection",
  data() {
    return {
      reverse: true,
      col: []
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
          console.log(res);
        })
        .catch(err => {
          // console.log(err);
        });
    },
    delcol(aid) {
      this.$axios
        .post("/cancelCollect", {
          userid: this.$store.state.username,
          articleid: aid
        })
        .then(res => {
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });

      var index = this.col.findIndex(item => {
        var colid = item.articleid._id;
        // console.log(aid);
        if (colid == aid) {
          return true;
        }
      });
      this.col.splice(index, 1);
    }
  },
  mounted() {
    this.$axios
      .post("/showCollect", {
        userid: this.$store.state.username
      })
      .then(res => {
        this.col = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.collection {
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
.see {
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
.see:hover {
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
.col {
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
>>> .el-timeline-item__tail {
  display: none;
}
>>> .el-timeline-item__node--normal {
  display: none;
}
</style>