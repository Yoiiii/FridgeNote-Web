<template>
  <div id="Main">
    <router-view />
    <van-tabbar v-model="active">
      <van-tabbar-item icon="orders-o">
        <router-link tag="div" to="/">冰箱</router-link>
      </van-tabbar-item>
      <!-- <van-tabbar-item icon="cart-o">
        <router-link to="/goodslist">物品</router-link>
      </van-tabbar-item>-->
      <van-tabbar-item icon="user-o">
        <router-link tag="div" to="/personal">个人</router-link>
      </van-tabbar-item>
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
      active: 0,
    };
  },
};
</script>
<style>
