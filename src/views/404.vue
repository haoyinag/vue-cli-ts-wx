<template>
  <div class="err-page">
    <div class="title">
      <img :src="imgSrc" alt="" />
    </div>

    <van-button
      round
      block
      @click="goHome"
      class="btn"
      type="info"
      native-type="submit"
    >
      返回首页
    </van-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Search extends Vue {
  private imgSrc = require("@/assets/404.png");

  created(): void {
    document.title = "页面丢失";
    // console.log(this.imgSrc);
  }

  goHome() {
    this.$router.push({
      path: "/"
    });
  }
}
</script>

<style lang="stylus">
.err-page
  height 100%
  display flex
  flex-direction column
  align-items center
  justify-content center

.title
  font-size 20px
  font-weight 500
  padding-bottom 20px

.btn
  width 100px
</style>
