<template>
  <div>
      <div style="margin: 16px;">
        <div class="fs-xl text-center">选择冰箱</div>
      </div>
      <van-radio-group v-model="result">
        <van-cell-group>
          <van-cell
            v-for="(item,index) in $store.state.FridgeList"
            clickable
            :key="item._id"
            :title="item.name"
            @click="change(index)"
          >
          </van-cell>
        </van-cell-group>
      </van-radio-group>
  </div>
</template>


<script>
import Vue from "vue";
import { Cell, CellGroup, RadioGroup, Radio } from "vant";
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(RadioGroup);
Vue.use(Radio);



export default {
  data() {
    return {
      result: '',
    };
  },
  methods: {
    change(index) {
      this.$emit("change", index);
    }
  }
};
</script>