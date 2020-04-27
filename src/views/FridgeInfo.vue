<template>
  <div class="home">
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
    <div v-if="fridge">
      <van-tabs v-model="active" color="#1989fa">
        <van-tab title="冷藏">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <goods v-for="good in fridge.cold" :key="good.id" :good="good">

              </goods>

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

import Vue from "vue";
import { Empty, Tab, Tabs, NavBar, Icon, List, Cell, CellGroup ,Divider} from "vant";
import goods from "../components/Goods";
Vue.use(Empty);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(NavBar);
Vue.use(Icon);
Vue.use(List);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Divider);
export default {
  name: "Home",
  data() {
    return {
      active: 0,
      loading: false,
      finished: false,
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
    goods
  },
  methods: {
    onClickLeft() {
      console.log("onClickLeft");
    },
    onClickRight() {
      console.log("onClickRight");
    },
    onLoad() {
      this.finished = true;
    }
  }
};
</script>
<style>
.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}
</style>
