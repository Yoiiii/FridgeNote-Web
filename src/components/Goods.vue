<template>
  <div class="good">
<van-card
  :num="good.count"
  price=""
  desc=""
  :title="good.name"
  :thumb="good.image"
/>
  </div>
</template>

<script>
import "vant/lib/card/style";
import Vue from 'vue';
import { Card } from 'vant';

Vue.use(Card);
export default {
  name: "good",
  props: {
    good:Object
  },
created(){
  //console.log(this.good);
}
};
</script>


