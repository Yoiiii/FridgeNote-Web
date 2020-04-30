<template>
  <div class="Personal">
    <van-sticky>
      <van-nav-bar title="个人"></van-nav-bar>
    </van-sticky>
    <van-cell-group>
      <van-cell title="注销" @click="logout"/>
      <van-cell title="新建冰箱" @click="addfridge = true" />
      <van-cell title="删除冰箱" @click="deletefridge" />
      <van-cell title="关于" />
    </van-cell-group>
    <van-popup v-model="addfridge" closeable position="bottom" :style="{ height: '30%' }">
      <AddFridge :userid="userID" @submit="addFridge"></AddFridge>
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

import Vue from "vue";
import {
  NavBar,
  Icon,
  List,
  Cell,
  CellGroup,
  Toast,
  Popup,
  Sticky
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
      userName: "",
      userID: "",
      model: {}
    };
  },
  components: {
    AddFridge
  },
  methods: {
    async addFridge(newFridge) {
      const res = await this.$http.post("rest/fridge", newFridge);
      if (res.data._id) {
        this.$notify({
          type: "success",
          message: "添加成功"
        });
        this.addfridge=false
      }
    },
    logout(){
      localStorage.clear();
      this.$router.push("/login");
    },
    deletefridge(){

    }
  },
  created() {
    const jwt = require("jsonwebtoken");
    if (localStorage.token) {
      const userInfo = jwt.decode(localStorage.token);
      this.userName = userInfo.username;
      this.userID = userInfo.id;
    } else {
      this.$router.push("/login");
    }
  }
};
</script>
<style>
/* .custom-image .van-empty__image {
  width: 90px;
  height: 90px;
} */
</style>
