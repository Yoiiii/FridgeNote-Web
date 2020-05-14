<template>
  <div class="AddFridge">
    <van-form @submit="onSubmit">
      <div style="margin: 16px;">
        <div class="fs-xl text-center">添加冰箱</div>
        <van-field
          v-model="model.name"
          name="冰箱名"
          label="冰箱名"
          placeholder="冰箱名"
          :rules="[{ required: true, message: '请填写冰箱名' }]"
        />
        <!-- <van-field name="checkboxGroup" label="冰箱结构">
          <template #input>
            <van-checkbox-group v-model="model.fridgeFormation" direction="horizontal">
              <van-checkbox name="1" shape="square">冷藏</van-checkbox>
              <van-checkbox name="2" shape="square">冷冻</van-checkbox>
              <van-checkbox name="3" shape="square">变温室</van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>
        <van-field v-if="model.fridgeFormation.indexOf('1')" name="stepper" label="冷藏">
          <template #input>
            <van-stepper v-model="stepper" />
          </template>
        </van-field> -->
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">添加</van-button>
        </div>
      </div>
    </van-form>
  </div>
</template>

<script>
import "vant/lib/field/style";
import "vant/lib/uploader/style";
import "vant/lib/radio/style";
import "vant/lib/radio-group/style";
import "vant/lib/stepper/style";
import "vant/lib/datetime-picker/style";
import "vant/lib/checkbox/style";
import "vant/lib/checkbox-group/style";

import Vue from "vue";
import {
  Form,
  Field,
  Uploader,
  Radio,
  RadioGroup,
  Stepper,
  DatetimePicker,
  Checkbox,
  CheckboxGroup
} from "vant";

Vue.use(Form);
Vue.use(Field);
Vue.use(Uploader);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Stepper);
Vue.use(DatetimePicker);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);

export default {
  name: "AddGoods",
  props: {
    userid: String
  },
  data() {
    return {
      model: {
        name: "",
        owner: "",
        fridgeFormation:[],
      },
      showTimePicker: false,
      value: "",
      uploader: [],
      
    };
  },
  methods: {
    onSubmit() {
      this.model.owner = this.userid;
      this.$emit("submit", this.model);
    }
  }
};
</script>