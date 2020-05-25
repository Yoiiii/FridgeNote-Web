<template>
  <div id="Main">
    <router-view />
    <van-tabbar v-model="active" @change="onChange"> 
       <van-tabbar-item icon="orders-o">冰箱</van-tabbar-item>
      <van-tabbar-item icon="user-o">个人</van-tabbar-item>
      <!-- <van-tabbar v-model="active">
        <router-link class="d-flex flex-gorw-1" to="/home" tag="div">
        <van-tabbar-item icon="orders-o">冰箱</van-tabbar-item>
        </router-link>
      <van-tabbar-item icon="user-o">
        <router-link to="/personal" tag="div">个人</router-link>
      </van-tabbar-item> -->
    </van-tabbar>
  </div>
</template>

<script>
import "vant/lib/nav-bar/style";
import "vant/lib/toast/style";
import "vant/lib/tabbar/style";
import "vant/lib/tabbar-item/style";
import "vant/lib/dialog/style";
import "vant/lib/notify/style";

import Vue from "vue";
import { NavBar, Toast, Tabbar, TabbarItem, Dialog, Notify } from "vant";

Vue.use(NavBar);
Vue.use(Toast);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Dialog);
Vue.use(Notify);
export default {
  name: "Main",
  data() {
    return {
      active: 0
    };
  },
  methods: {
    onChange() {
      if (this.active == 0) {
        this.$router.push("/");
      } else if (this.active == 1) {
        this.$router.push("/personal");
      }
    },
    getUserInfo() {
      const jwt = require("jsonwebtoken");
      if (localStorage.token) {
        const userInfo = jwt.decode(localStorage.token);
        this.$store.commit("setUserInfo", {
          userName: userInfo.username,
          userId: userInfo.id
        });
      } else {
        this.$router.push("/login");
      }
    }
  },
  created() {
    this.getUserInfo();
    if (this.$route.path === "/") {
      this.active = 0;
    } else {
      this.active = 1;
    }
  }
};
</script>
<style>
</style>