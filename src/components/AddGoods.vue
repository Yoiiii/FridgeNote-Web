<template>
  <div class="AddGoods">
    <van-form @submit="onSubmit">
      <div style="margin: 16px;">
        <div class="fs-xl text-center">添加物品</div>
        <van-field
          v-model="model.name"
          name="物品名"
          label="物品名"
          placeholder="物品名"
          :rules="[{ required: true, message: '请填写存入冰箱的物品名' }]"
        />
        <van-field name="uploader" label="相片">
          <template #input>
            <van-uploader
              :max-size="3 * 1024 * 1024"
              @oversize="onOversize"
              v-model="uploader"
              max-count="1"
              accept="image"
              capture
              :after-read="afterRead"
            />
          </template>
        </van-field>
        <van-field name="radio" label="类型">
          <template #input>
            <van-radio-group v-model="model.type" direction="horizontal">
              <van-radio name="1">冷藏</van-radio>
              <van-radio name="2">冷冻</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field name="stepper" label="数量">
          <template #input>
            <van-stepper v-model="model.count" />
          </template>
        </van-field>
        <van-field
          readonly
          clickable
          name="datetimePicker"
          :value="outDate"
          label="保质期"
          placeholder="点击选择保质期"
          @click="showTimePicker = true"
        />
        <van-popup get-container="AddGoods" v-model="showTimePicker" position="bottom">
          <van-datetime-picker
            :v-model="model.outDate"
            type="date"
            @confirm="onConfirm"
            @cancel="showTimePicker = false"
            :min-date="minDate"
          />
        </van-popup>
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
import "../utils/utils";

import Vue from "vue";
import {
  Form,
  Field,
  Uploader,
  Radio,
  RadioGroup,
  Stepper,
  DatetimePicker
} from "vant";
import utils from '../utils/utils';

Vue.use(Form);
Vue.use(Field);
Vue.use(Uploader);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Stepper);
Vue.use(DatetimePicker);

export default {
  name: "AddGoods",
  data() {
    return {
      model: {
        name: "",
        count: 1,
        inDate: "",
        exp: 0,
        outDate: "",
        image: "",
        type: 1,
        owner: ""
      },
      minDate: "",
      showTimePicker: false,
      value: "",
      uploader: [],
      outDate: ""
    };
  },
  // computed:{
  //    exp(){
  //     return Math.floor(this.model.outData-this.model.inData/(24*3600*1000))
  //    }
  // },
  methods: {
    onSubmit() {
      this.model.owner = this.$store.state.selectFridge._id;
      this.model.exp = Math.floor(
        (this.model.outDate - this.model.inDate) / (24 * 3600 * 1000)
      );
      this.$emit("submit", this.model);
    },
    onConfirm(time) {
      this.outDate = utils.formatTime(time, "yyyy-MM-dd");
      //this.outDate = this.formatTime(time, "yyyy-MM-dd");
      this.model.outDate = time;
      console.log(this.model.outDate);

      this.showTimePicker = false;
    },
    onOversize(file) {
      let newfile =utils.compress(file,1000,0.5)
      // let newfile =this.compress(file,1000,0.5)
      this.afterRead(newfile);
    },
    async afterRead(file) {
      const formData = new FormData(); // 声明一个FormData对象
      formData.append("file", file.file);
      const res = await this.$http.post("upload", formData);
      this.model.image = res.data.url;
    },
    // formatTime: function(date1, fmt) {
    //   let date = new Date(date1);
    //   if (/(y+)/.test(fmt)) {
    //     fmt = fmt.replace(
    //       RegExp.$1,
    //       (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    //     );
    //   }
    //   var o = {
    //     "M+": date.getMonth() + 1,
    //     "d+": date.getDate(),
    //     "h+": date.getHours(),
    //     "m+": date.getMinutes(),
    //     "s+": date.getSeconds()
    //   };
    //   for (var k in o) {
    //     if (new RegExp("(" + k + ")").test(fmt)) {
    //       var str = o[k] + "";
    //       fmt = fmt.replace(
    //         RegExp.$1,
    //         RegExp.$1.length === 1 ? str : ("00" + str).substr(str.length)
    //       );
    //     }
    //   }
    //   return fmt;
    // },
    // compress(base64String, w, quality) {
    //   var getMimeType = function(urlData) {
    //     var arr = urlData.split(",");
    //     var mime = arr[0].match(/:(.*?);/)[1];
    //     // return mime.replace("image/", "");
    //     return mime;
    //   };
    //   var newImage = new Image();
    //   var imgWidth, imgHeight;

    //   var promise = new Promise(resolve => (newImage.onload = resolve));
    //   newImage.src = base64String;
    //   return promise.then(() => {
    //     imgWidth = newImage.width;
    //     imgHeight = newImage.height;
    //     var canvas = document.createElement("canvas");
    //     var ctx = canvas.getContext("2d");
    //     if (Math.max(imgWidth, imgHeight) > w) {
    //       if (imgWidth > imgHeight) {
    //         canvas.width = w;
    //         canvas.height = (w * imgHeight) / imgWidth;
    //       } else {
    //         canvas.height = w;
    //         canvas.width = (w * imgWidth) / imgHeight;
    //       }
    //     } else {
    //       canvas.width = imgWidth;
    //       canvas.height = imgHeight;
    //     }
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     ctx.drawImage(newImage, 0, 0, canvas.width, canvas.height);
    //     var base64 = canvas.toDataURL(getMimeType(base64String), quality);
    //     return base64;
    //   });
    // }
  },
  created() {
    this.model.inDate = new Date();
    this.minDate = new Date();
  }
};
</script>