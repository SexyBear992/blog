<template>
  <div class="modify">
    <indexNav />
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
        >
      <el-form-item label="用户名:" prop="username">
        {{ruleForm.username}}
        <!-- <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input> -->
      </el-form-item>

      <el-form-item label="密码:" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="重复密码:" prop="pass2">
        <el-input type="password" v-model="ruleForm.pass2" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="头像">
        <div class="avatarBox">
          <img
            :src="'http://111.230.149.24:80/images/avatar/'+this.$store.state.userinfo.userinfo.pic"
            ref="ava"
            v-if="ava"
          />
          <i class="el-icon-plus" v-else></i>
          <input type="file" ref="file" @change="changFile($event)" name="avatar" id="avatar" />
        </div>
      </el-form-item>

      <el-form-item label="简介">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>

      <el-form-item label="验证码" prop="verifivation">
        <el-input
          type="text"
          v-model="ruleForm.verifivation"
          autocomplete="off"
          class="verifivation"
        ></el-input>
        <verification @VArr="VArr" class="VArr" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确定修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import indexNav from "@/components/index/indexNav";
import verification from "@/components/index/verification.vue";
export default {
  name: "modify",
  data() {
    var validatePass = (rule, value, callback) => {
      var Preg = /^(\w){6,20}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (Preg.test(value)) {
          callback();
          return true;
        } else {
          callback(new Error("密码不少于6位"));
        }
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else {
        if (value === this.ruleForm.pass) {
          callback();
          return true;
        } else {
          callback(new Error("两次密码不一致"));
        }
      }
    };

    var validataVer = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        if (value == this.verifica) {
          callback();
          return true;
        } else {
          callback(new Error("验证码错误"));
        }
      }
    };

    return {
      ava: true,
      verifica: "",
      ruleForm: {
        username: this.$store.state.username,
        pass: "",
        pass2: "",
        pic: "",
        desc: this.$store.state.userinfo.userinfo.content,
        verifivation: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        pass2: [{ validator: validatePass2, trigger: "blur" }],
        verifivation: [{ validator: validataVer, trigger: "blur" }]
      }
    };
  },
  components: {
    verification,
    indexNav
  },
  methods: {
    changFile(e) {
      //   this.ava = true;
      this.ruleForm.pic = e.target.files[0];
      var render = new FileReader();
      render.readAsDataURL(e.target.files[0]);
      var this_ = this;
      render.onload = function() {
        this_.$refs.ava.src = render.result;
      };
    },
    VArr(data) {
      this.verifica = data.join("");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var d = new FormData();
          d.append("username", this.ruleForm.username);
          d.append("password", this.ruleForm.pass);
          d.append("avatar", this.ruleForm.pic);
          d.append("content", this.ruleForm.desc);

          axios
            .post("http://111.230.149.24:80/modify", d, {
              headers: { "Content-Type": "mulitpart/form-data" }
            })
            .then(res => {
              alert("修改成功");
              this.$refs[formName].resetFields();
              localStorage.removeItem("userinfo");
              this.$router.push("/");
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    // passw(){
    //     console.log('777');
        
    // }
  }
  //   mounted() {
  //     console.log(this.$store.state.userinfo);
  //   }
};
</script>


<style scoped>
.el-form{
    width: 400px;
    margin: 20px auto;
}
.avatarBox {
  width: 100px;
  height: 100px;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  position: relative;
}
.avatarBox img {
  width: 100px;
  border-radius: 6px;
  height: 100px;
}
.el-icon-plus {
  font-size: 28px;
  color: #8c939d;
  position: absolute;
  top: 35%;
  left: 35%;
}
input[type="file"] {
  -webkit-appearance: none;
  -o-appearance: none;
  appearance: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>