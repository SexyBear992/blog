<template>
  <div class="comment">
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
      <el-button type="primary" v-if="usershow" @click="comment()">发表</el-button>
      <el-button type="info" disabled v-else>请登录</el-button>
    </div>

    <div class="allComment">
      <div class="commentBox" v-for="(item,i) in comments.slice(0,5) " :key="i">
        <div class="comment_avatar">
          <img :src="'http://111.230.149.24:80/images/avatar/' + item.avatar" />
        </div>
        <div class="comment_Right">
          <div class="comment_username">{{item.username}}</div>
          <div class="comment_text">{{item.content}}</div>
          <div class="comment_time">{{item.time|dateFormat}}</div>
        </div>
      </div>
    </div>
    <!-- {{comments.length}} -->
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        current-page.sync="1"
        :page-size="5"
        layout="prev, pager, next, jumper"
        :hide-on-single-page="true"
        :total="commentsLen"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "comment",
  props: ["details"],
  data() {
    return {
      commentText: "",
      usershow: false,
      comments: [],
      commentsLen: 0
    };
  },
  mounted() {
    if (localStorage.getItem("userinfo") == null) {
      this.usershow = false;
    } else {
      this.usershow = true;
    }

    this.$axios
      .post("showComment", {
        articleid: this.$route.query.id
      })
      .then(res => {
        this.comments = res.data.data;
        this.commentsLen = res.data.data.length;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    comment() {
      if (this.commentText == "") {
        alert("评论内容不能为空");
      } else {
        this.$axios
          .post("/comment", {
            username: this.$store.state.username,
            userid: this.$store.state.userinfo.userinfo._id,
            avatar: this.$store.state.userinfo.userinfo.pic,
            author: this.details.author,
            articleid: this.$route.query.id,
            content: this.commentText
          })
          .then(res => {
            this.commentText = "";
            this.$axios
              .post("/showComment", {
                articleid: this.$route.query.id
              })
              .then(res => {
                this.comments = res.data.data;
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
    handleCurrentChange(val) {
      this.$axios
        .post("/showComment", {
          articleid: this.$route.query.id,
          pag: val - 1
        })
        .then(res => {
          this.comments = res.data.data;
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
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
.pagination{
    padding-left: 100px;
    padding-bottom: 20px;
}
</style>