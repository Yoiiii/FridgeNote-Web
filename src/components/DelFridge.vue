<template>
  <div>
    <van-form @submit="onSubmit">
      <div style="margin: 16px;">
        <div class="fs-xl text-center">删除冰箱</div>
      </div>

      <van-checkbox-group v-model="result">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in $store.state.FridgeList"
            clickable
            :key="item._id"
            :title="item.name"
            @click="toggle(index)"
          >
            <template #right-icon>
              <van-checkbox :name="item" ref="checkboxes" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">删除</van-button>
      </div>
    </van-form>
  </div>
</template>


<script>
import Vue from "vue";
import { Cell, CellGroup, Checkbox } from "vant";
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Checkbox);

export default {
  data() {
    return {
      result: []
    };
  },
  methods: {
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    onSubmit() {
      this.$emit("submit", this.result);
    }
  }
};
</script>