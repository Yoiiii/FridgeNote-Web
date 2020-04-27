<template>
  <div id="app">

    <router-view/>
    <van-tabbar v-model="active" >
      <van-tabbar-item icon="orders-o">
        <router-link to="/">冰箱</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="cart-o">
        <router-link to="/about">物品</router-link>
        </van-tabbar-item>
      <van-tabbar-item icon="user-o">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import "vant/lib/nav-bar/style";
import "vant/lib/toast/style";
import "vant/lib/tabbar/style";
import "vant/lib/tabbar-item/style";
import Vue from "vue";
import { NavBar, Toast, Tabbar, TabbarItem } from "vant";
Vue.use(NavBar);
Vue.use(Toast);
Vue.use(Tabbar);
Vue.use(TabbarItem);
export default {
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    }
  }
};
</script>
<style>
