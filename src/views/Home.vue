<template>
  <div class="home">
    <div v-if="!loading" class="content">
      <van-grid clickable :column-num="1">
        <van-grid-item
          dot
          icon="service-o"
          text="保函真伪查询系统"
          to="/assure_search"
        />
        <!-- {{ GET_USER_NAME }}
        {{ SET_NUM }} -->
        <!-- <van-grid-item icon="search" text="URL 跳转" url="/vant/mobile.html" /> -->
      </van-grid>
    </div>
    <van-skeleton title avatar :row="5" :loading="loading"> </van-skeleton>
    <!-- <van-divider /> -->
    <van-skeleton title avatar :row="5" :loading="loading"> </van-skeleton>
    <!-- <van-divider /> -->
    <van-skeleton title avatar :row="5" :loading="loading"> </van-skeleton>
  </div>
</template>

<script>
// @ is an alias to /src
// import { Route } from "vue-router"; // 检测规则
// import { mapGetters } from "vuex";

// import { UserGetters, UserMutations } from "@/store/types";

export default {
  name: "Home",
  data: () => {
    return {
      loading: true
    };
  },
  mounted: function() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
  // computed: {
  //   ...mapGetters([UserGetters.GET_USER_NAME, UserGetters.SET_NUM]),
  // },
  /** ts环境使用路由守卫需要在main.ts中通过装饰器装载 */
  // beforeRouteLeave(to: Route, from: Route, next: () => void): void {
  //   console.log(this, "beforeRouteEnter");
  //   // 这边是取不到this实例,如果在此调用方法 可以注册一个静态方法 static xxx，HelloWorld.xxx
  //   // 如果你知道有更好的方法，望告知
  //   next();
  // },
  components: {}
};
</script>
