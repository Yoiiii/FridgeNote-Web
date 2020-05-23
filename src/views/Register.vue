<template>
  <div class="Register">
    <div style="margin-top:50%">
      <van-form @submit="register">
        <van-field
          v-model="model.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' },
          { usernameRules, message:'只能输入5-20个以字母开头的字符'}]"
        />
        <van-field
          v-model="model.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' },
          { passwordRules,message:'只能输入6-20个字母、数字、下划线'}]"
        />
        <van-field
          v-model="confirmpassword"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ required: true, message: '请填写确认密码' },
          { confirmpasswordRules,message:'只能输入6-20个字母、数字、下划线'}]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">注册</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Form } from "vant";
Vue.use(Form);

export default {
  name: "Register",
  data() {
    return {
      model: {
        username: "",
        password: ""
      },
      confirmpassword: ""
    };
  },
  methods: {
    async register() {
      if (this.model.password != this.confirmpassword) {
        this.$notify("请确认密码");
      } else {
        const res = await this.$http.post("register", this.model);
        //sessionStorage.token=res.data.token//仅一次，关闭浏览器即消除
        this.$router.push("/login");
        if (res.data) {
          this.$notify({
            type: "success",
            message: "注册成功"
          });
        }
      }
    },
    passwordRules(val) {
      return /^(\w){6,20}$/.test(val);
    },
    usernameRules(val) {
      return /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/.test(val);
    },
    confirmpasswordRules(){
      if(this.model.password===this.confirmpassword){
        return true
      }else
      {
        return false
      }
      
    }
  }
};
</script>