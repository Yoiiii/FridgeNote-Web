<template>
  <div class="good">
    <van-swipe-cell >
      <div class="d-flex flex-row jc-between bg-white p-2 mt-1">
        <van-image width="8rem" height="8rem" fit="cover" :src="good.image" class="img">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
        <div class="d-flex flex-column flex-grow-1 p-2">
          <div class="mt-1 mb-1">{{good.name}}</div>
          <div class="flex-grow-1">{{good.inData}}</div>
          <div class="mb-1">{{good.exp}}</div>
        </div>
        <div class="d-flex flex-row jc-end ai-end p-2">
          <!-- <div class="d-flex ai-center">
            <van-button plain type="info" hairline round size="mini">-</van-button>
            <div class="text-center p-1">{{good.count}}</div>
            <van-button plain type="info" hairline round size="mini">+</van-button>
          </div>-->
          <van-stepper v-model="good.count" @change="numchange" />
        </div>
      </div>
      <template #right>
        <van-button square text="刪除" type="danger" @click="del" class="delete-button" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import "vant/lib/swipe-cell/style";
import "vant/lib/divider/style";
import "vant/lib/button/style";
import "vant/lib/stepper/style";
import "vant/lib/image/style";
import "vant/lib/loading/style";

import Vue from "vue";
import { SwipeCell, Button, Divider, Stepper, Image,Loading } from "vant";
Vue.use(Divider);
Vue.use(SwipeCell);
Vue.use(Button);
Vue.use(Stepper);
Vue.use(Image);
Vue.use(Loading);

export default {
  name: "good",
  props: {
    good: Object
  },
  data() {
    return {
      centered: true,
      model:{

      }
    };
  },
  computed: {
    countDown() {
      return this.good.exp + "天后过期";
    }
  },
  methods: {
    numchange(value) {
      this.model.count=value
      this.$emit("numChange",value,this.model);
    },
    del(){
      this.$emit('delectGoods',this.good._id)
    }
  },
  created() {
    this.model=this.good
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
  padding: 10px;
  width: 30%;
}
</style>

