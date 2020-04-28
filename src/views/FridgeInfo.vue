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
        <addgoods @submit="submit"></addgoods>
      </van-popup>
    </div>
    <van-empty
      v-else
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
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
      loading: false,
      finished: false,
      pickerfridge: false,
      activeKey: 0,
      sidebarKey: 0,
      addGoods: false,
      showTimePicker: false,
      fridgeList: ["我的冰箱", "你的冰箱"],
      fridge: {
        id: "1111",
        name: "我的冰箱",
        cold: [
          {
            id: "12312",
            name: "香蕉",
            count: 1,
            inData: "2020-4-27",
            exp: 7,
            outDate: "2020-5-4",
            image: "https://img.yzcdn.cn/vant/ipad.jpeg"
          },
          {
            id: "123122",
            name: "苹果",
            count: 1,
            inData: "2020-4-27",
            exp: 7,
            outDate: "2020-5-4",
            image: "https://img.yzcdn.cn/vant/ipad.jpeg"
          }
        ],
        freeze: [
          {
            id: "12312",
            name: "雪糕",
            count: 1,
            inData: "2020-4-27",
            exp: 365,
            outDate: "2021-4-27",
            image: "https://img.yzcdn.cn/vant/ipad.jpeg"
          }
        ]
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
      Toast(`当前值：${value}, 当前索引：${index}`);
    },
    submit(goods){
      console.log(goods);
      this.addGoods = false;
      Toast.success('添加成功');
    },
    numChange(value,id){
      console.log(value,id);

    }
  },
  created() {
    console.log(this.fridgeList.name);
  }
};
</script>
<style>
/* .custom-image .van-empty__image {
  width: 90px;
  height: 90px;
} */
</style>
