<template>
  <div class="home">
    <van-sticky>
      <van-nav-bar
        :title="$store.state.selectFridge.name"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #left>
          <van-icon name="bars" size="18" />
        </template>
        <template #right>
          <van-icon name="plus" size="18" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <div v-if="haveFridge" class="bg-back">
      <van-tabs v-model="active" color="#1989fa" sticky animated>
        <van-tab title="冷藏">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <goods
                v-for="good in fridge.cold"
                :key="good.id"
                :good="good"
                @numChange="numChange"
                @delectGoods="delectGoods"
              ></goods>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="冷冻">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell-group>
              <goods
                v-for="good in fridge.freeze"
                :key="good.id"
                :good="good"
                @numChange="numChange"
                @delectGoods="delectGoods"
              ></goods>
            </van-cell-group>
          </van-list>
        </van-tab>
      </van-tabs>
      <van-popup v-model="pickerfridge" closeable position="bottom" :style="{ height: '30%' }">
        <!-- <van-picker :columns="fridgeList" @change="onChange" /> -->
        <selectFridge @change="onChange"></selectFridge>
      </van-popup>
      <van-popup v-model="addGoods" closeable position="bottom" :style="{ height: '70%' }">
        <addgoods @submit="submit"></addgoods>
      </van-popup>
    </div>
    <div v-else class="d-flex flex-column">
      <van-empty
        class="custom-image"
        image="https://shawyoi.cn/uploads/custom-empty-image.png"
        description="暂无冰箱,请新建冰箱"
      />
      <van-button normal round plain type="info" native-type="submit" @click="addfridge=true">新建冰箱</van-button>
    </div>
    <van-popup v-model="addfridge" closeable position="bottom" :style="{ height: '30%' }">
      <AddFridge @submit="addFridge"></AddFridge>
    </van-popup>
  </div>
</template>

<script>
import "vant/lib/empty/style";
import "vant/lib/tab/style";
import "vant/lib/tabs/style";
import "vant/lib/nav-bar/style";
import "vant/lib/icon/style";
import "vant/lib/list/style";
import "vant/lib/divider/style";
import "vant/lib/picker/style";
import "vant/lib/toast/style";
import "vant/lib/popup/style";
import "vant/lib/sticky/style";
import "vant/lib/sku/style";
import "vant/lib/sidebar/style";
import "vant/lib/sidebar-item/style";
import "vant/lib/dialog/style";

import Vue from "vue";
import goods from "../components/Goods";
import addgoods from "../components/AddGoods";
import AddFridge from "../components/AddFridge";
import selectFridge from "../components/SelectFridge"

import {
  Empty,
  Tab,
  Tabs,
  NavBar,
  Icon,
  List,
  Cell,
  CellGroup,
  Divider,
  Picker,
  Toast,
  Popup,
  Sticky,
  Sku,
  Sidebar,
  SidebarItem,
  Dialog,
  PullRefresh
} from "vant";

Vue.use(PullRefresh);
Vue.use(Empty);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(NavBar);
Vue.use(Icon);
Vue.use(List);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Divider);
Vue.use(Picker);
Vue.use(Toast);
Vue.use(Popup);
Vue.use(Sticky);
Vue.use(Sku);
Vue.use(Sidebar);
Vue.use(SidebarItem);

export default {
  name: "Home",
  data() {
    return {
      active: 0,
      loading: false,
      finished: false,
      pickerfridge: false,
      activeKey: 0,
      sidebarKey: 0,
      addGoods: false,
      showTimePicker: false,
      fridgeList: [],
      fridge: {
        id: "",
        name: "",
        cold: [],
        freeze: []
      },
      haveFridge: false,
      isLoading: false,
      addfridge: false
    };
  },
  components: {
    goods,
    addgoods,
    AddFridge,
    selectFridge,
  },
  async created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      await this.getfridgeList(this.$store.state.userId);
      if (this.$store.state.selectFridge._id) {
        await this.getGoodsList(this.$store.state.selectFridge._id);
      }
    },
    async onRefresh() {
      await this.getGoodsList(this.$store.state.selectFridge._id);
      this.isLoading = false;
    },
    onClickLeft() {
      this.pickerfridge = true;
    },
    onClickRight() {
      this.addGoods = true;
    },
    onLoad() {
      this.finished = true;
    },
    onChange(index) {
      this.$store.commit("changeFridge", index);
      //this.fridge.id =this.$store.state.selectFridge._id// this.fridgeId[index];
      //this.fridge.name = this.$store.state.selectFridge.name//this.fridgeList[index];
      this.getGoodsList(this.$store.state.selectFridge._id);
      this.pickerfridge = false;
    },
    submit(goods) {
      this.addGoods = false;
      this.$http.post("rest/goods/", goods);
      Toast.success("添加成功");
      this.fetch();
    },
    numChange(value, model) {
      this.$http.put(`rest/goods/${model._id}`, model);
    },
    async getfridgeList(id) {
      await this.$store.dispatch("getFridgeList", id);
      //const res = await this.$http.post("getfridgelist/", { id: id });
      if (this.$store.state.FridgeList[0]._id == "") {
        this.haveFridge = false;
      } else {
        this.haveFridge = true;
        this.fridgeList = [];
        for (let item of this.$store.state.FridgeList) {
          this.fridgeList.push(item.name);
        }
      }
    },
    async getGoodsList(id) {
      const res = await this.$http.post("getgoodslist/", {
        id: id
      });
      let cold = res.data.filter(n => {
        return n.type == 1;
      });
      let freeze = res.data.filter(n => {
        return n.type == 2;
      });
      this.fridge.cold = cold;
      this.fridge.freeze = freeze;
    },
    delectGoods(id) {
      Dialog.confirm({
        title: "删除",
        message: "是否确认删除该物品"
      })
        .then(async () => {
          // on confirm
          const res = await this.$http.delete(`rest/goods/${id}`);
          if (res.data) {
            this.$notify({
              type: "success",
              message: "删除成功"
            });
            this.onRefresh();
            //this.fetch();
          }
        })
        .catch(() => {
          // on cancel
        });
    },
    async addFridge(newFridge) {
      const res = await this.$http.post("addfridge/", newFridge);
      if (res.data._id) {
        this.$notify({
          type: "success",
          message: "添加成功"
        });
        this.addfridge = false;
        this.fetch();
        //this.onRefresh()
      }
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
