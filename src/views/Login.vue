<template>
  <div class="Login">
    <div style="margin-top:50%">
      <van-form @submit="login">
        <van-field
          v-model="model.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="model.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">登录</van-button>
          <div class="d-flex jc-center p-4">
            <router-link to="/register">注册</router-link>
          </div>
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
  name: "GoodsList",
  data() {
    return {
      model: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.model);
      //sessionStorage.token=res.data.token//仅一次，关闭浏览器即消除
      localStorage.token = res.data.token; //可多次
      this.$router.push("/");
      this.$notify({
        type: "success",
        message: "登陆成功"
      });
    }
  }
};
</script>