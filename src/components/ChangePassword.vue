<template>
  <div class="ChangePassword">
    <van-form @submit="onSubmit">
      <div style="margin: 16px;">
        <div class="fs-xl text-center">修改密码</div>
        <van-field
          v-model="model.oldPassword"
          name="原密码"
          label="原密码"
          type="password"
          placeholder="原密码"
          :rules="[{ required: true, message: '请填写原密码' },
          { validator:passwordRules,message:'只能输入6-20个字母、数字、下划线'}
          ]"
        />
        <van-field
          v-model="model.newPassword"
          name="新密码"
          label="新密码"
          type="password"
          placeholder="新密码"
          :rules="[{ required: true, message: '请填写新密码' },
          { validator:passwordRules,message:'只能输入6-20个字母、数字、下划线'}]"
        />
        <van-field
          v-model="confirmPassword"
          type="password"
          name="确认新密码"
          label="确认新密码"
          placeholder="确认新密码"
          :rules="[{ required: true, message: '请再次填写新密码' },
          { validator:confirmpasswordRules,message:'两次密码不一致'}]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">修改密码</van-button>
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
  name: "ChangePassword",
  data() {
    return {
      model: {
        oldPassword: "",
        newPassword: "",
      },
      confirmPassword:""
    };
  },
  methods: {
    onSubmit() {
      this.model.userId = this.$store.state.userId;
      this.$emit("submit", this.model);
    },
    passwordRules(val) {
      return /^(\w){6,20}$/.test(val);
    },
    confirmpasswordRules() {
      if (this.model.password === this.confirmpassword) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {}
};
</script>