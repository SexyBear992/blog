<template>
  <div class="indexNav">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <router-link to="/">
        <el-menu-item index="1" style="float:left">首页</el-menu-item>
      </router-link>

      <div class="search">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select" v-if="searchshow">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>

      <div class="nologinBox" v-if="login">
        <!-- <router-link to="/user/history"> -->
        <el-menu-item index="6">
          <div @click="drawerReg = !drawerReg">注册</div>
        </el-menu-item>
        <!-- </router-link> -->
        <!-- <router-link to="/user/history"> -->
        <el-menu-item index="7">
          <div @click="drawerLog = !drawerLog">登录</div>
        </el-menu-item>
        <!-- </router-link> -->
      </div>

      <div class="logingBox" v-else>
        <router-link to="/publish">
          <el-menu-item index="6">
            <div class="pus">发表</div>
          </el-menu-item>
        </router-link>

        <router-link to="/user/history">
          <el-menu-item index="5">历史</el-menu-item>
        </router-link>

        <router-link to="/user/collection">
          <el-menu-item index="4">收藏</el-menu-item>
        </router-link>

        <router-link to="/user/myArticle">
          <el-menu-item index="3">文章</el-menu-item>
        </router-link>
        <el-submenu index="2">
          <template slot="title">
            <router-link to="/user/myArticle">
              <img
                :src="'http://111.230.149.24:80/images/avatar/'+this.$store.state.userinfo.userinfo.pic"
                alt
                class="avatar"
              />
            </router-link>
          </template>
          <div class="counts">
            <div>
              <p>关注</p>
              <p>{{folllen}}</p>
            </div>

            <div class="friends">
              <p>粉丝</p>
              <p>{{fanslen}}</p>
            </div>

            <div>
              <p>文章</p>
              <p>{{artlen}}</p>
            </div>
          </div>
          <el-menu-item index="2-1" @click="modify">修改信息</el-menu-item>
          <el-menu-item index="2-2" @click="out">退出</el-menu-item>
        </el-submenu>
      </div>
    </el-menu>

    <el-drawer title="注册" :visible.sync="drawerReg" :with-header="false">
      <register />
    </el-drawer>

    <el-drawer title="登录" :visible.sync="drawerLog" :with-header="false">
      <login />
    </el-drawer>
  </div>
</template>

<script>
import register from "./register.vue";
import login from "./login.vue";
export default {
  name: "indexNav",
  data() {
    return {
      activeIndex2: "1",
      input3: "",
      login: true,
      drawerReg: false,
      drawerLog: false,
      artlen: 0,
      fanslen: 0,
      folllen: 0,
      searchshow: false
    };
  },
  components: {
    register,
    login
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    out() {
      localStorage.removeItem("userinfo");
      alert("退出登录成功");
      this.$router.go(0);
    },
    search() {
      if (this.input3 == "") {
        alert("请输入搜索内容");
      } else {
        this.$axios
          .post("/searchLen", {
            keyword: this.input3
          })
          .then(res => {
            this.$store.state.searchLen = res.data.data.length;
          })
          .catch(err => {
            console.log(err);
          });
        this.$axios
          .post("/search", {
            keyword: this.input3,
            pag: 0
          })
          .then(res => {
            this.$store.state.search = res.data.data;

            if (this.$route.path != "/search") {
              this.$router.replace({ path: "/search" });
            } else {
              this.$router.go(0);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      // searchLen
    },
    modify(){
      this.$router.push('/modify')
    }
  },
  mounted() {
    if (this.$route.path == "/search") {
      this.searchshow = false;
    } else {
      this.searchshow = true;
    }
    if (localStorage.getItem("userinfo") == null) {
      this.login = true;
    } else {
      this.login = false;

      this.$axios
        .post("/showFollow", {
          userid: this.$store.state.username
        })
        .then(res => {
          this.folllen = res.data.data.length;
        })
        .catch(err => {
          console.log(err);
        });

      this.$axios
        .post("/showFans", {
          followid: this.$store.state.userinfo.userinfo._id
        })
        .then(res => {
          this.fanslen = res.data.data.length;
        })
        .catch(err => {
          console.log(err);
        });
    }

    this.$axios
      .post("/showArticle", {
        userid: this.$store.state.username
      })
      .then(res => {
        this.artlen = res.data.data.length;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.avatar {
  width: 30px;
  border-radius: 50%;
  border: 2px solid #eee;
}
.counts {
  display: flex;
  justify-content: space-around;
  padding-bottom: 5px;
  margin: 0px 5px 0 5px;
  border-bottom: 1px solid #ccc;
}
.counts p {
  text-align: center;
  color: #fff;
}
.el-menu {
  padding: 0px 40px;
  display: flex;
  justify-content: space-around;
}
.el-menu-item,
.el-submenu {
  float: right;
  color: #fff !important;
}
.pus {
  border: 2px solid #fb7299;
  border-radius: 5px;
  background: #fb7299;
  padding: 0px 20px;
  font-size: 16px;
  line-height: 35px;
  margin-top: 10px;
}
.search {
  flex: 1;
}
.el-input-group {
  width: 50%;
  margin-left: 40%;
  margin-top: 10px;
}
.el-select .el-input {
  width: 130px;
}
.nologinBox {
  width: 394px;
}

>>> .el-menu--horizontal > .el-submenu .el-submenu__icon-arrow {
  display: none;
}
>>> .el-menu.el-menu--horizontal {
  border-bottom: none !important;
}
>>> .el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: none !important;
}
>>> .el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  outline: 0;
  background-color: transparent !important;
  color: #303133;
}
</style>