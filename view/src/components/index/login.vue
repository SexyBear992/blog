<template>
  <div class="login">
    <h2>登录</h2>

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

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "login",
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

    return {
      ruleForm: {
        username: "",
        pass: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.pt = this;
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.pt.$axios
            .post("/login", {
              username: this.ruleForm.username,
              password: this.ruleForm.pass
            })
            .then(res => {
              if (res.data.status == "fail") {
                alert("请输入正确的用户密码");
              } else {
                if (res.data.data.userid == 'SexyBear') {
                  localStorage.setItem(
                    "userinfo",
                    JSON.stringify(res.data.data)
                  );
                  this.$router.push('/admin')
                } else {
                  localStorage.setItem(
                    "userinfo",
                    JSON.stringify(res.data.data)
                  );
                  this.$router.go(0);
                }
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
</style>