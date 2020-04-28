<template>
  <div id="app">
    <router-view/>
    <van-tabbar v-model="active" >
      <van-tabbar-item icon="orders-o">
        <router-link tag="div" to="/">冰箱</router-link>
      </van-tabbar-item>
      <!-- <van-tabbar-item icon="cart-o">
        <router-link to="/goodslist">物品</router-link>
        </van-tabbar-item> -->
      <van-tabbar-item icon="user-o">
        <router-link tag="div" to="/goodslist">个人</router-link>
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

import Vue from "vue";
import { NavBar, Toast, Tabbar, TabbarItem,Dialog } from "vant";

Vue.use(NavBar);
Vue.use(Toast);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Dialog);
export default {
  data() {
    return {
      active: 0,
    };
  },
  methods: {
  }
};
</script>
<style>
