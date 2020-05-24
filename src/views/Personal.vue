<template>
  <div class="Personal">
    <van-sticky>
      <van-nav-bar title="个人"></van-nav-bar>
    </van-sticky>
    <van-cell-group>
      <van-cell title="注销" @click="logout" />
      <van-cell title="新建冰箱" @click="addfridge = true" />
      <van-cell title="删除冰箱" @click="delfridge = true" />
      <van-cell title="修改密码" @click="changepassword = true" />
      <van-cell title="关于" />
    </van-cell-group>
    <van-popup v-model="addfridge" closeable position="bottom" :style="{ height: '30%' }">
      <AddFridge @submit="addFridge"></AddFridge>
    </van-popup>
    <van-popup v-model="changepassword" closeable position="bottom" :style="{ height: '50%' }">
      <ChangePassword @submit="changePassword"></ChangePassword>
    </van-popup>
    <van-popup v-model="delfridge" closeable position="bottom" :style="{ height: '40%' }">
      <DelFridge @submit="deletefridge"></DelFridge>
    </van-popup>
  </div>
</template>

<script>
import "vant/lib/nav-bar/style";
import "vant/lib/icon/style";
import "vant/lib/toast/style";
import "vant/lib/popup/style";
import "vant/lib/sticky/style";

import AddFridge from "../components/AddFridge";
import DelFridge from "../components/DelFridge";
import ChangePassword from "../components/ChangePassword";

import Vue from "vue";
import {
  NavBar,
  Icon,
  List,
  Cell,
  CellGroup,
  Toast,
  Popup,
  Sticky,
  Dialog
} from "vant";

Vue.use(NavBar);
Vue.use(Icon);
Vue.use(List);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Toast);
Vue.use(Popup);
Vue.use(Sticky);

export default {
  name: "Personal",
  data() {
    return {
      addfridge: false,
      delfridge: false,
      changepassword: false,
      userName: "",
      userID: "",
      model: {}
    };
  },
  components: {
    AddFridge,
    DelFridge,
    ChangePassword
  },
  methods: {
    async addFridge(newFridge) {
      const res = await this.$http.post("addfridge/", newFridge);
      if (res.data._id) {
        this.$notify({
          type: "success",
          message: "添加成功"
        });
        this.addfridge = false;
      }
    },
    logout() {
      Dialog.confirm({
        title: "注销",
        message: "是否确认注销"
      }).then(() => {
        localStorage.clear();
        this.$store.commit("deleteUserInfo");
        this.$router.push("/login");
        this.$notify({
          type: "success",
          message: "注销成功"
        });
      });
    },
    deletefridge(result) {
      Dialog.confirm({
        title: "删除",
        message: "是否确认删除"
      }).then(async () => {
        result.forEach(async item => {
          await this.$http.delete(`rest/fridges/${item._id}`);
        });
        await this.$store.dispatch("getFridgeList", this.$store.state.userId);
        this.delfridge = false;
        this.$notify({
          type: "success",
          message: "删除成功"
        });
      });
    },
    async changePassword(model) {
      const res = await this.$http.post("changepassword/", model);
      console.log(res.data);
      if (res.data) {
        this.changepassword = false;
        localStorage.clear();
        this.$store.commit("deleteUserInfo");
        this.$router.push("/login");
        this.$notify({
          type: "success",
          message: "修改密码成功"
        });
        // this.$notify({
        //   type: "success",
        //   message: "注销成功"
        // });
      }
    }
  },
  ///fridge/api/changepassword
  created() {
    this.$store.dispatch("getFridgeList", this.$store.state.userId);
  }
};
</script>
<style>
/* .custom-image .van-empty__image {
  width: 90px;
  height: 90px;
} */
</style>
