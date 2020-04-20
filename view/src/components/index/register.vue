<template>
  <div class="register">
    <h2>注册</h2>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="重复密码" prop="pass2">
        <el-input type="password" v-model="ruleForm.pass2" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="性别">
        <el-select v-model="ruleForm.region">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="头像">
        <div class="avatarBox">
          <img src ref="ava" v-if="ava" />
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
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
verification;
import axios from "axios";
import verification from "@/components/index/verification.vue";
export default {
  name: "register",
  components: {
    verification
  },
  data() {
    var validateUsername = (rule, value, callback) => {
      var Ureg = /^[a-zA-Z0-9_-]{4,16}$/;
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (Ureg.test(value)) {
          callback();
          return true;
        } else {
          callback(new Error("用户名不少于4个(字母，数字，下划线，减号)"));
        }
      }
    };

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
      ava: false,
      verifica: "",
      ruleForm: {
        username: "",
        pass: "",
        pass2: "",
        region: "男",
        pic: "",
        desc: "",
        verifivation: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        pass2: [{ validator: validatePass2, trigger: "blur" }],
        verifivation: [{ validator: validataVer, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.pt = this;
  },
  methods: {
    changFile(e) {
      this.ava = true;
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
        if (this.ruleForm.pic == "") {
          this.ruleForm.pic = "default.jpg";
        }
        if (this.ruleForm.desc == "") {
          this.ruleForm.desc = "这个博主很懒，什么都没留下~";
        }
        if (valid) {
          var d = new FormData();
          d.append("username", this.ruleForm.username);
          d.append("password", this.ruleForm.pass);
          d.append("gender", this.ruleForm.region);
          d.append("avatar", this.ruleForm.pic);
          d.append("content", this.ruleForm.desc);

          axios
            .post("http://111.230.149.24:80/register", d, {
              headers: { "Content-Type": "mulitpart/form-data" }
            })
            .then(res => {
              if (res.data.status == "fail") {
                alert("该用户名已注册");
                this.$refs[formName].model.username = "";
                this.$refs[formName].model.verifivation = "";
              } else {
                alert("注册成功");
                this.$refs[formName].resetFields();
                this.$router.go(0)
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
h2 {
  margin: 20px;
}
.el-form {
  margin-top: 20px;
  width: 90%;
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
.verifivation {
  width: 35%;
  float: left;
}
.VArr {
  overflow: hidden;
  padding: 5px 0 0 10px;
}
</style>