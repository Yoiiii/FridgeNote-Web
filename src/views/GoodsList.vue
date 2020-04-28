<template>
  <div class="GoodsList">
    <van-sticky>
      <van-search v-model="search" placeholder="请输入搜索关键词" />
    </van-sticky>
    <div class="d-flex flex-clomun">
      <div>
        <van-sidebar v-model="sidebarKey">
          <van-sidebar-item title="标签名称" />
          <van-sidebar-item title="标签名称" />
          <van-sidebar-item title="标签名称" />
        </van-sidebar>
      </div>
      <div>
        <van-grid column-num="3">
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
        </van-grid>
        <van-grid  column-num="3">
          <van-grid-item text="文字">
            <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
            666
          </van-grid-item>
          <van-grid-item>
            <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
          </van-grid-item>
          <van-grid-item>
            <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import "vant/lib/search/style";
import "vant/lib/sticky/style";
import "vant/lib/sidebar/style";
import "vant/lib/sidebar-item/style";
import "vant/lib/grid/style";
import "vant/lib/grid-item/style";


import Vue from "vue";
import { Search, Sticky, Sidebar, SidebarItem, Grid, GridItem,Image as VanImage } from "vant";

Vue.use(Search);
Vue.use(Sticky);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(VanImage);

export default {
  name: "GoodsList",
  data() {
    return {
      search: "",
      sidebarKey: ""
    };
  }
};
</script>