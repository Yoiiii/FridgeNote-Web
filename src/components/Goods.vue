<template>
  <div class="good">
    <van-swipe-cell>
      <div class="d-flex flex-row jc-between bg-white p-1 mt-1">
        <img :src="good.image" alt class="img" />
        <div class="d-flex flex-column flex-grow-1 p-1">
          <div class="mt-1 mb-1">{{good.name}}</div>
          <div class="flex-grow-1">{{good.inData}}</div>
          <div class="mb-1">{{good.exp}}</div>
        </div>
        <div class="d-flex flex-row jc-end ai-end  p-1">
          <!-- <div class="d-flex ai-center">
            <van-button plain type="info" hairline round size="mini">-</van-button>
            <div class="text-center p-1">{{good.count}}</div>
            <van-button plain type="info" hairline round size="mini">+</van-button>
          </div> -->
          <van-stepper v-model="good.count"  @change="numchange"/>
        </div>
      </div>
      <template #right>
        <van-button square text="刪除" type="danger" class="delete-button" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import "vant/lib/swipe-cell/style";
import "vant/lib/divider/style";
import "vant/lib/button/style";
import "vant/lib/stepper/style";

import Vue from "vue";
import { SwipeCell, Button, Divider,Stepper } from "vant";
Vue.use(Divider);
Vue.use(SwipeCell);
Vue.use(Button);
Vue.use(Stepper);
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
  methods:{
    numchange(value){
      this.$emit('numChange',value,this.good.id)
    }
  },
  created() {
    //console.log(this.good);
  }
};
</script>
<style>
.item {
  background: #fff;
  display: flex;
  justify-content: left;
}
.delete-button {
  height: 100%;
}
.img {
  width: 30%;
}
</style>

