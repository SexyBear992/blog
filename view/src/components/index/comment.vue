<template>
  <div class="comment">
    <!-- <div class="list">
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
        <div class="rep" @click="reply(item._id)">
          <span>评论</span>
          <span>{{repLenght}}条</span>
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
          <textarea type="text" cols="70" v-model="commentText" />
        </div>
        <div class="reply_but">
          <el-button type="primary" v-if="usershow" @click="comment(item._id)">发表</el-button>
          <el-button type="info" disabled v-else>请登录</el-button>
        </div>

        <div class="commentBox" v-for="(itemC,iC) in comments.c" :key="iC">
          <div class="comment_avatar">
            <img :src="'http://111.230.149.24:80/images/avatar/123456789.jpg'" />
          </div>
          <div class="comment_Right">
            <div class="comment_username">{{itemC.username}}</div>
            <div class="comment_text">{{itemC.content}}</div>
            <div class="comment_but"></div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "comment",
  // props: ["article", "count"],
  // data() {
  //   return {
  //     usershow: false,
  //     commentText: "",
  //     comments: [],
  //     repLenght: "0"
  //   };
  // },
  // methods: {
  //   comment(aid) {
  //     if (this.commentText == "") {
  //       alert("评论内容不能为空");
  //     } else {
  //       this.$axios
  //         .post("/comment", {
  //           username: this.$store.state.username,
  //           userid: this.$store.state.userinfo.userinfo._id,
  //           avatar: this.$store.state.userinfo.userinfo.pic,
  //           articleid: aid,
  //           content: this.commentText
  //         })
  //         .then(res => {
  //           this.commentText = "";
  //         })
  //         .catch(err => {
  //           console.log(err);
  //         });
  //     }
  //   }
  // },
  // mounted() {
  //   if (localStorage.getItem("userinfo") == null) {
  //     this.usershow = false;
  //   } else {
  //     this.usershow = true;
  //   }
  // }
};
</script>

<style  scoped>
/* .infinite-list-item {
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
}
.pic {
  padding-right: 20px;
}
.pic img {
  width: 150px;
}

.text {
  max-height: 100px;
  width: 446px;
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
  -webkit-appearance: none; 
  -o-appearance: none;
  appearance: none;
  height: 40px;
  padding: 5px;
  border: 1px solid #555;
  border-radius: 5px;
  resize: none;
  outline: none;
}
.reply_but {
  float: left;
  padding: 5px 0 26.5px 20px;
  border-bottom: 1px solid #ccc;
}
.commentBox {
  clear: both;
}
.commentBox img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  float: left;
}
>>> .text img {
  display: none !important;
} */
</style>