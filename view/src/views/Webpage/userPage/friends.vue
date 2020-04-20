<template>
  <div class="friends">
    <h1>FRIENDS</h1>

    <div class="box">
      <div class="myfriends" v-for="(i,index) in friend" :key="index">
        <div class="avatar">
          <img :src="'http://111.230.149.24:80/images/avatar/'+i.followid.pic" />
        </div>

        <div class="details">
          <p class="name">{{i.followid.username}}</p>
          <p class="content">{{i.followid.content}}</p>
        </div>
        <!-- @click="follow"  -->
        <el-popconfirm title="确定取消关注？" :hideIcon="true" @onConfirm="follow(i.followid._id)">
          <el-button slot="reference">取消关注</el-button>
        </el-popconfirm>
      </div>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          current-page.sync="1"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :hide-on-single-page="true"
          :total="friendLen"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "friends",
  data() {
    return {
      friend: [],
      friendLen:0
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(val);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.$axios
        .post("/showFollow", {
          userid: this.$store.state.username,
          pag: val - 1
        })
        .then(res => {
          this.friend = res.data.data;
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      console.log(`当前页: ${val}`);
    },
    follow(fid) {
      console.log(fid);

      this.$axios
        .post("/cancelFollow", {
          userid: this.$store.state.username,
          followid: fid
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });

      var index = this.friend.findIndex(item => {
        var friendid = item.followid._id;
        if (friendid == fid) {
          return true;
        }
      });
      this.friend.splice(index, 1);
    }
  },
  mounted() {
    this.$axios
      .post("/showFollow", {
        userid: this.$store.state.username,
        pag : 0
      })
      .then(res => {
        this.friend = res.data.data;
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    this.$axios
      .post("/showFollow", {
        userid: this.$store.state.username
      })
      .then(res => {
        this.friendLen = res.data.data.length;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
h1 {
  margin: 40px;
}

.myfriends {
  height: 80px;
  width: 700px;
  clear: both;
  margin: 0 0 10px 40px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.avatar {
  float: left;
}
.avatar img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}

.details {
  padding-top: 10px;
  float: left;
  padding-left: 10px;
  line-height: 30px;
}
.name {
  color: #409eff;
  font-size: 18px;
}
.content {
  font-size: 13px;
}
.el-button {
  float: right;
  margin-top: 30px;
  background-color: rgb(229, 233, 239);
  color: rgb(109, 117, 122);
  font-size: 12px;
  padding: 5px 10px;
}
.el-button:hover {
  color: #409eff;
}
.el-pagination {
  width: 530px;
  margin: 0 auto;
}
</style>