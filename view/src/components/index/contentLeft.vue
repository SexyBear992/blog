<template>
  <div class="contentLeft">
    <div class="box">
      <div class="title">
        <div class="l-line"></div>
        <h3>每日精选</h3>
        <div class="r-line"></div>
      </div>

      <div>
        <ul>
          <li v-for="(item,i) in content.slice(0,8)" :key="i">
            <i></i>
            <router-link :to="'/myDetails?id='+item._id">
              <span @click="articleSee(item._id)">{{item.title}}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "contentLeft",
  data() {
    return {
      lenght: 8,
      content: []
    };
  },
  mounted() {
    this.$axios
      .post("/selected")
      .then(res => {
        this.content = res.data.data;
        // console.log(this.content);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    articleSee(aid) {
      this.$axios
        .post("/articleSee", {
          articleid: aid,
          userid: this.$store.state.userinfo.userinfo.username
        })
        .then(res => {
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
.box {
  width: 100%;
  height: 300px;
  /* border: 1px solid #999; */
}
.title {
  position: relative;
}
h3 {
  font-weight: 600;
  font-size: 18px;
  color: #ad6f5b;
  text-align: center;
}
.l-line {
  width: 25%;
  height: 1px;
  background-color: #ccc;
  position: absolute;
  top: 11px;
  left: 0;
}
.r-line {
  width: 25%;
  height: 1px;
  background-color: #ccc;
  position: absolute;
  top: 11px;
  right: 0;
}
i {
  content: "";
  display: block;
  height: 4px;
  width: 4px;
  background: #ab9d9c;
  position: absolute;
  z-index: 2;
  left: 4px;
  top: 9px;
}
ul {
  margin-top: 20px;
}
ul li {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  margin-top: 10px;
}
a {
  text-decoration: none;
  margin-left: 10px;
  font-size: 14px;
  color: #333;
  letter-spacing: 0;
  line-height: 22px;
}
</style>