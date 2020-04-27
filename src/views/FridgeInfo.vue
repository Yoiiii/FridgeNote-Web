<template>
  <div class="home">
    <div v-if="fridge">
      <van-tabs v-model="active">
        <van-tab title="冷藏">
          <goods v-for="good in fridge.cold" :good="good" :key="good.id"></goods>
        </van-tab>
        <van-tab title="冷凍">冷凍</van-tab>
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
import Vue from "vue";
import { Empty, Tab, Tabs } from "vant";
import goods from "../components/Goods";
Vue.use(Empty);
Vue.use(Tab);
Vue.use(Tabs);
export default {
  name: "Home",
  data() {
    return {
      active: 0,
      fridge: {
        id: "1111",
        cold: [
          {
            id:'12312',
            name: "香蕉",
            count: 1,
            inData: "2020-4-27",
            EXP: 7,
            outDate: "2020-5-4",
            image: ""
          }
        ],
        freeze: [
          {
            id:'12312',
            name: "雪糕",
            count: 1,
            inData: "2020-4-27",
            EXP: 365,
            outDate: "2021-4-27",
            image: ""
          }
        ]
      }
    };
  },
  components: {
    goods
  }
};
</script>
<style>
.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}
</style>
