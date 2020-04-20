<template>
  <div class="carousel">
    <el-carousel :interval="5000" arrow="always" height="350px">
      <el-carousel-item v-for="(item,i) in article.slice(0,5)" :key="i">
        <!-- <h3>{{ item }}</h3> -->
        <router-link :to="'/myDetails?id='+item._id">
          <img
            :src="'http://111.230.149.24:80/images/pic/'+item.pic"
            alt
            @click="articleSee(item._id)" v-if="item.pic"
          />
          <img :src="'http://111.230.149.24:80/images/avatar/123456789.jpg'" alt v-else >
        </router-link>
        <div class="title">
          <router-link :to="'/myDetails?id='+item._id">
            <h2 @click="articleSee(item._id)">{{item.title}}</h2>
          </router-link>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "carousel",
  data() {
    return {
      article:[]
    }
  },
  methods: {
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
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
        this.$axios
      .post("/selected")
      .then(res => {
        this.article = res.data.data;
        // console.log(this.content);
      })
      .catch(err => {
        console.log(err);
      });
  },
  watch: {
    article(val) {
      // console.log(val);
    }
  }
};
</script>

<style scoped>
img {
  width: 750px;
  cursor: pointer;
}
.el-carousel-item {
  position: relative;
}
a {
  text-decoration: none;
  color: #111;
}
h2 {
  padding-left: 20px;
  background: rgba(0, 0, 0, 0.1);
  line-height: 80px;
  cursor: pointer;
}
.title {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>