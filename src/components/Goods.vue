<template>
  <div class="good">
    <van-swipe-cell>
      <van-card
        :num="good.count"
        :price="countDown"
        :desc="good.inData"
        :title="good.name"
        :thumb="good.image"
        currency
      >
        <template #footer>
          <van-button hairline round size="mini">-</van-button>
          <van-button hairline round size="mini">+</van-button>
        </template>
      </van-card>
      <template #right>
        <van-button square text="全部取出" type="danger" class="delete-button" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import "vant/lib/card/style";
import "vant/lib/swipe-cell/style";
import "vant/lib/divider/style";
import Vue from "vue";
import { Card, SwipeCell, Button,Divider } from "vant";
Vue.use(Divider);
Vue.use(SwipeCell);
Vue.use(Card);
Vue.use(Button);
export default {
  name: "good",
  props: {
    good: Object
  },
  data() {
    return {
      centered: true
    };
  },
  computed: {
    countDown() {
      return this.good.exp + "天后过期";
    }
  },
  created() {
    //console.log(this.good);
  }
};
</script>
<style>
.delete-button {
  height: 100%;
}
</style>

