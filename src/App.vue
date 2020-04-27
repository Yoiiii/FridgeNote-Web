<template>
  <div id="app">
    <van-nav-bar
      title="冰箱日记"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <router-view/>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">
        <router-link to="/">Home</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="search">
        <router-link to="/about">About</router-link>
        </van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import "vant/lib/nav-bar/style";
import "vant/lib/toast/style";
import "vant/lib/tabbar/style";
import "vant/lib/tabbar-item/style";
import Vue from "vue";
import { NavBar, Toast,  Tabbar, TabbarItem } from "vant";
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
