<template>
  <div class="home">
    <van-sticky>
      <van-nav-bar
        :title="fridge.name"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #left>
          <van-icon name="bars" size="18" />
        </template>
        <template #right>
          <van-icon name="plus" size="18" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <div v-if="fridge" class="bg-back">
      <van-tabs v-model="active" color="#1989fa" sticky animated>
        <van-tab title="冷藏">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <goods v-for="good in fridge.cold" :key="good.id" :good="good" @numChange="numChange"></goods>
          </van-list>
        </van-tab>
        <van-tab title="冷冻">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell-group>
              <goods v-for="good in fridge.freeze" :key="good.id" :good="good"></goods>
            </van-cell-group>
          </van-list>
        </van-tab>
      </van-tabs>
      <van-popup v-model="pickerfridge" closeable position="bottom" :style="{ height: '30%' }">
        <van-picker :columns="fridgeList" @change="onChange" />
      </van-popup>
      <van-popup v-model="addGoods" closeable position="bottom" :style="{ height: '70%' }">
        <addgoods @submit="submit" :id="fridge.id"></addgoods>
      </van-popup>
    </div>
    <van-empty
      v-else
      class="custom-image"
      image="https://shawyoi.cn/uploads/custom-empty-image.png"
      description="暂无冰箱"
    />
  </div>
</template>

<script>
import "vant/lib/empty/style";
import "vant/lib/tab/style";
import "vant/lib/tabs/style";
import "vant/lib/nav-bar/style";
import "vant/lib/icon/style";
import "vant/lib/list/style";
import "vant/lib/divider/style";
import "vant/lib/picker/style";
import "vant/lib/toast/style";
import "vant/lib/popup/style";
import "vant/lib/sticky/style";
import "vant/lib/sku/style";
import "vant/lib/sidebar/style";
import "vant/lib/sidebar-item/style";

import Vue from "vue";
import goods from "../components/Goods";
import addgoods from "../components/AddGoods";
import {
  Empty,
  Tab,
  Tabs,
  NavBar,
  Icon,
  List,
  Cell,
  CellGroup,
  Divider,
  Picker,
  Toast,
  Popup,
  Sticky,
  Sku,
  Sidebar,
  SidebarItem
} from "vant";

Vue.use(Empty);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(NavBar);
Vue.use(Icon);
Vue.use(List);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Divider);
Vue.use(Picker);
Vue.use(Toast);
Vue.use(Popup);
Vue.use(Sticky);
Vue.use(Sku);
Vue.use(Sidebar);
Vue.use(SidebarItem);

export default {
  name: "Home",
  data() {
    return {
      active: 0,
      userid: "",
      userName: "",
      loading: false,
      finished: false,
      pickerfridge: false,
      activeKey: 0,
      sidebarKey: 0,
      addGoods: false,
      showTimePicker: false,
      fridgeList: [],
      fridgeId: [],
      fridge: {
        id: "",
        name: "",
        cold: [],
        freeze: []
      }
    };
  },
  components: {
    goods,
    addgoods
  },
  methods: {
    onClickLeft() {
      this.pickerfridge = true;
      console.log("onClickLeft");
    },
    onClickRight() {
      this.addGoods = true;
      console.log("onClickRight");
    },
    onLoad() {
      this.finished = true;
    },
    onChange(picker, value, index) {
      this.fridge.id = this.fridgeId[index];
      this.fridge.name = this.fridgeList[index];
    },
    submit(goods) {
      console.log('goods',goods);
      this.addGoods = false;
      this.$http.post("rest/goods/", goods);
      Toast.success("添加成功");
    },
    numChange(value, id) {
      console.log(value, id);
    },
    async fetch() {
      await this.getfridgeList(this.userid);
      await this.getGoodsList(this.fridge.id);
    },
    getUserInfo() {
      const jwt = require("jsonwebtoken");
      if (localStorage.token) {
        const userInfo = jwt.decode(localStorage.token);
        this.userName = userInfo.username;
        this.userid = userInfo.id;
      } else {
        this.$router.push("/login");
      }
    },
    async getfridgeList(id) {
      const res = await this.$http.post("getfridgelist/", { id: id });
      this.fridgeList = [];
      this.fridgeId = [];
      this.fridge.id = res.data[0]._id;
      for (let item of res.data) {
        this.fridgeList.push(item.name);
        this.fridgeId.push(item._id);
      }
    },
    async getGoodsList(id) {
      const res = await this.$http.post("getgoodslist/", {
        id: id
      });
      console.log(res.data);
      let cold =res.data.filter(n=>{
        return n.type==1
      })
      console.log('clod',cold);
      let freeze=res.data.filter(n=>{
        return n.type==2
      })
      console.log('freeze',freeze);
      this.fridge.cold=cold
      this.fridge.freeze=freeze
    }
  },
  created() {
    this.getUserInfo();
    this.fetch();
  }
};
</script>
<style>
/* .custom-image .van-empty__image {
  width: 90px;
  height: 90px;
} */
</style>
