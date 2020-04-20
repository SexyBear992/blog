<template>
  <div class="searchBox">
    <indexNav />
    <div class="search">
      <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <div class="listBox">
      <div v-for="(item,i) in article" class="infinite-list-item" :key="i">
        <div class="list">
          <router-link :to="'/myDetails?id='+item._id">
            <p class="title" @click="articleSee(item._id)">{{item.title}}</p>
          </router-link>
          <div class="newsBox">
            <div class="pic">
              <router-link :to="'/myDetails?id='+item._id">
                <img
                  :src="'http://111.230.149.24:80/images/pic/'+ item.pic"
                  @click="articleSee(item._id)"
                  alt
                />
              </router-link>
            </div>
            <div class="contentRight">
              <div class="text">
                <router-link :to="'/myDetails?id='+item._id" class="textContent" ref="textC">
                  <p v-html="item. content" @click="articleSee(item._id)"></p>
                </router-link>
              </div>
              <div class="alltext">
                <router-link :to="'/myDetails?id='+item._id" class="read">
                  <p @click="articleSee(item._id)">阅读全文</p>
                </router-link>
              </div>
            </div>
          </div>

          <div class="but">
            <div class="see">
              <span>浏览</span>
              <span>{{item.see}}</span>
            </div>
            <div class="rep" @click="reply(item)">
              <span>评论</span>
              <!-- <span>{{repLenght}}条</span> -->
            </div>
            <div class="like">
              <span>喜欢</span>
            </div>
            <div class="share">
              <span>分享</span>
            </div>
          </div>
          <div class="replyBox" v-show="replyshow = false" ref="replyBoxs">
            <div class="reply_avatar">
              <img
                :src="'http://111.230.149.24:80/images/avatar/' + $store.state.userinfo.userinfo.pic"
                alt
                v-if="usershow"
              />

              <img :src="'http://111.230.149.24:80/images/avatar/123456789.jpg'" alt v-else />
            </div>
            <div class="reply_text">
              <textarea
                type="text"
                cols="70"
                v-model="commentText"
                placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"
              />
            </div>
            <div class="reply_but">
              <el-button type="primary" v-if="usershow" @click="comment(item._id)">发表</el-button>
              <el-button type="info" disabled v-else>请登录</el-button>
            </div>
            <!-- {{item.reply}} -->
            <div class="allComment">
              <div class="commentBox" v-for="(comiten,comi) in comments[i]" :key="comi">
                <div class="comment_avatar">
                  <img :src="'http://111.230.149.24:80/images/avatar/' + comiten.avatar" />
                </div>
                <div class="comment_Right">
                  <div class="comment_username">{{comiten.username}}</div>
                  <div class="comment_text">{{comiten.content}}</div>
                  <div class="comment_time">{{comiten.time|dateFormat}}</div>
                </div>
              </div>
              <div class="moreComment">
                <!-- <span>共{{}}条</span> -->
                <router-link :to="'/myDetails?id='+item._id">
                  <span @click="articleSee(item._id)">查看全部评论</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        current-page.sync="1"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :hide-on-single-page="true"
        :total="artLen"
      ></el-pagination>
    </div>
    <div class="noart" v-if="noart">
      <span>无相关文章</span>
    </div>
  </div>
</template>
<script>
import indexNav from "@/components/index/indexNav";
export default {
  name: "search",
  components: {
    indexNav
  },
  data() {
    return {
      article: [],
      usershow: false,
      commentText: "",
      comments: [],
      input3: "",
      noart: true,
      artLen: 0,
      userid: ""
    };
  },
  mounted() {
    if (localStorage.getItem("userinfo") == null) {
      this.usershow = false;
    } else {
      this.usershow = true;
    }
    this.article = this.$store.state.search;
    this.artLen = this.$store.state.searchLen;

    if (this.article.length == 0) {
      this.noart = true;
    } else {
      this.noart = false;
    }
  },
  methods: {
    search() {
      if (this.input3 == "") {
        alert("请输入搜索内容");
      } else {
        this.$axios
          .post("/search", {
            keyword: this.input3,
            pag: 0
          })
          .then(res => {
            this.article = res.data.data;
            if (this.article.length == 0) {
              this.noart = true;
            } else {
              this.noart = false;
            }
          })
          .catch(err => {
            console.log(err);
          });

        this.$axios
          .post("/searchLen", {
            keyword: this.input3
          })
          .then(res => {
            this.artLen = res.data.data.length;
            console.log(this.artLen);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    reply(art) {
      var index = this.article.findIndex(item => {
        var repid = item._id;
        // console.log(aid);
        if (repid == art._id) {
          return true;
        }
      });
      if (this.$refs.replyBoxs[index].style.display == "none") {
        this.$refs.replyBoxs[index].style.display = "block";
      } else {
        this.$refs.replyBoxs[index].style.display = "none";
      }

      this.$axios
        .post("/showComment", {
          articleid: art._id,
          pag: 0
        })
        .then(res => {
          this.$set(this.comments, index, res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    comment(aid) {
      if (this.commentText == "") {
        alert("评论内容不能为空");
      } else {
        this.$axios
          .post("/comment", {
            username: this.$store.state.username,
            userid: this.$store.state.userinfo.userinfo._id,
            avatar: this.$store.state.userinfo.userinfo.pic,
            articleid: aid,
            content: this.commentText
          })
          .then(res => {
            this.commentText = "";

            var index = this.article.findIndex(item => {
              var repid = item._id;
              // console.log(aid);
              if (repid == aid) {
                return true;
              }
            });
            this.$axios
              .post("/showComment", {
                articleid: aid,
                pag: 0
              })
              .then(res => {
                this.$set(this.comments, index, res.data.data);
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    articleSee(aid) {
      if (localStorage.getItem("userinfo")) {
        this.userid = this.$store.state.username;
      } else {
        this.userid = "tourist";
      }
      this.$axios
        .post("/articleSee", {
          articleid: aid,
          userid: this.userid
        })
        .then(res => {
          //   console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCurrentChange(val) {
      this.$axios
        .post("/search", {
          keyword: this.input3,
          pag: val - 1
        })
        .then(res => {
          this.article = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {}
};
</script>
<style scoped>
.search {
  width: 800px;
  margin: 50px auto;
}
.listBox {
  width: 800px;
  margin: 0px auto;
}
.infinite-list-item {
  margin: 20px auto;
  width: 100%;
  margin-bottom: 10px;
}
.list {
  clear: both;
}
.title {
  font-size: 18px;
  font-weight: 600;
}
a {
  text-decoration: none;
  color: #000;
}
.newsBox {
  margin-top: 20px;
  display: flex;
  /* overflow: hidden; */
}
.pic {
  /* float: left; */
  padding-right: 20px;
}
.pic img {
  width: 150px;
}

.text {
  max-height: 100px;
  width: 446px;
  /* float: left; */
  font-size: 15px;
  line-height: 25px;
  overflow: hidden;
}
.textContent {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
}
.read {
  color: rgb(23, 81, 153);
}

.but {
  margin: 10px;
  clear: both;
  width: 500px;
  display: flex;
  justify-content: space-between;
  color: rgb(118, 131, 155);
  font-size: 14px;
  cursor: pointer;
}

.replyBox {
  overflow: hidden;
}
.reply_avatar {
  margin-left: 10px;
}
.reply_avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  float: left;
}
.reply_text {
  margin-left: 20px;
  float: left;
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;
}
.reply_text textarea[type="text"] {
  -webkit-appearance: none; /*去除原样式*/
  -o-appearance: none;
  appearance: none;
  /* width: 200%; */
  height: 40px;
  padding: 5px;
  border: 1px solid #555;
  border-radius: 5px;
  resize: none;
  outline: none; /*去除外边框*/
  /* background-color: #f3f3f3; */
}
.reply_but {
  float: left;
  padding: 5px 0 26.5px 20px;
  border-bottom: 1px solid #ccc;
}
.allComment {
  clear: both;
  padding: 10px 0;
  margin-left: 20px;
  width: 90%;
}
.commentBox {
  clear: both;
  padding: 10px;
}
.commentBox img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  float: left;
}
.comment_Right {
  overflow: hidden;
  padding-left: 10px;
}
.comment_Right .comment_text {
  padding-top: 10px;
  padding-left: 5px;
}
.comment_Right .comment_time {
  padding-top: 5px;
  padding-left: 5px;
}
.comment_username {
  font-size: 12px;
  color: #fb7299;
  font-weight: bold;
}
.comment_time {
  font-size: 12px;
  color: #6d757a;
}
.moreComment {
  /* text-align: center; */
  padding-left: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  font-size: 12px;
}
.moreComment a {
  /* display: inline-block; */
  color: #00a1d6;
}
.pagination {
  width: 800px;
  padding-left: 50px;
  margin: 30px auto;
}
.noart {
  text-align: center;
}
>>> .text img {
  display: none !important;
}
</style>