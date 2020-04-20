<template>
  <div class="leftNav" :style="{width:leftNavWidth +'px'}">
      <div class="leftNavBox">

        <img :src="'http://111.230.149.24:80/images/avatar/'+this.$store.state.userinfo.userinfo.pic" class="avatar" @click="modify">

        <p class="content">{{this.$store.state.userinfo.userinfo.content}}</p>

        <el-row class="tac">
            <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
            background-color="transparent"
            text-color="#fff"
            active-text-color="#00a8e0">

                <router-link to="/">
                    <el-menu-item index="1">
                        <span slot="title">首 页</span>
                    </el-menu-item>
                </router-link>

                <router-link to="myArticle">
                    <el-menu-item index="2">
                        <span slot="title">文 章</span>
                    </el-menu-item>
                </router-link>

                <router-link to="friends">
                    <el-menu-item index="3">
                        <span slot="title">好 友</span>
                    </el-menu-item>
                </router-link>

                <router-link to="news">
                    <el-menu-item index="4">
                        <span slot="title">消 息</span>
                    </el-menu-item>
                </router-link>

                <router-link to="collection">
                    <el-menu-item index="5">
                        <span slot="title">收 藏</span>
                    </el-menu-item>
                </router-link>

                <router-link to="history">
                    <el-menu-item index="6">
                        <span slot="title">历 史</span>
                    </el-menu-item>
                </router-link>
            </el-menu>
        </el-row>

      </div>

  </div>
</template>

<script>
export default {
  name: 'leftNav',
  data(){
      return{
          cWidth : document.documentElement.clientWidth,
          leftNavWidth: '',
          activeIndex:''
      }
  },
  mounted() {
      this.leftNavWidth = this.cWidth/4
      
      switch(this.$route.path){
            case '/user/' : this.activeIndex = '2'
                break;
            case '/user/myArticle' : this.activeIndex = '2'
                break;
            case '/user/friends' :this.activeIndex = '3'
                break;
            case '/user/news' :this.activeIndex = '4'
                break;
            case '/user/collection' :this.activeIndex = '5'
                break;
            case '/user/history' :this.activeIndex = '6'
                break;
        }
      },
      
  methods: {
      modify(){
          this.$router.push('/modify')
      }
  }
}
</script>

<style scoped>
    /* 隐藏滚动条 */
    .leftNav::-webkit-scrollbar {
        display: none; /* Chrome Safari */
    }
    .leftNav{
        -ms-overflow-style: none; /* IE 10+ */
        scrollbar-width: none;/* Firefox */
        height: 100%;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        background: url(../../assets/banner-1.jpg) no-repeat bottom;
        background-size: cover;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        -ms-background-size: cover;
        overflow-x: hidden;
        padding-top: 20px;
        color: #fff
    }
    a{
        color: #fff;
        text-decoration: none
    }
    .leftNavBox{
        margin: 20px auto;
        display: block;
        margin-right: 20px;
    }
    .avatar{
        width: 100px;
        height: 100px;
        border: 4px solid #eee;
        border-radius: 50%;
        margin: 30px  auto;
        display: block;
        margin-top: 50px;
        margin-right: 20px;
    }
    .content{
        width: 50%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: right;
        margin: 40px auto;
        margin-right: 20px;
        color: rgba(255, 255, 255, 0.5)
    }
    .el-menu{
        border-right: none;
        text-align: right
    }
    .el-menu-item:focus, .el-menu-item:hover {
        outline: 0;
        background-color: transparent !important;
    }
    
</style>

