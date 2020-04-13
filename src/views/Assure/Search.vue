<template>
  <div class="assure-search">
    <van-form @submit="onSubmit">
      <div class="title">保函真伪查询系统</div>
      <van-field
        v-model="code"
        name="code"
        label="保函编号"
        placeholder="请输入保函编号"
        :rules="[{ required: true, message: '请填写保函编号' }]"
      />
      <van-field
        v-model="accessCode"
        type="accessCode"
        name="accessCode"
        label="查询码"
        placeholder="请输入查询码"
        :rules="[{ required: true, message: '请填写查询码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <div class="info">
      Copyright @ 2016-2019 海南创泰联合非融资性担保有限公司 All Rights Reserved
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { Button } from "vant";
import { getAssureResult } from "@/services";

interface Login {
  accessCode: string;
  code: string;
}

interface Response {
  success: boolean;
  message: string;
  code: number;
  result: any;
  timestamp: number;
}

@Component
export default class Search extends Vue {
  // @Prop() private msg!: string;
  // accessCode=202865&code=唯鼎2020投保字004号
  private accessCode = "";
  private code = "";

  onSubmit(e: Login) {
    console.log(e);
    getAssureResult({
      code: e.code,
      accessCode: e.accessCode
    }).then((res: any) => {
      console.log(res);
      if (res.success && res.result) {
        this.$toast.success(res.message);

        this.$router.push({
          path: "/assure_result",
          name: "Result", // 传了name属性之后页面无法展示
          query: res.result,
          params: res.result
        });
      } else {
        this.$toast.fail("无查询结果");
      }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.assure-search
  padding 10px
  height calc(100% - 20px)
  background #f7f8fa
  display flex
  flex-direction column
  align-items center
  justify-content center
  position relative
  .van-form
    width 100%
    padding 20px 0
    background-color #fff
    border-radius 6px
    border 1px solid #fff
    .title
      margin-bottom 10px
    .van-cell.van-field
        font-size 16px
    .van-button--info {
        color: #fff;
        font-size 18px
        background-color: rgba(50, 208, 146, 1);
        border: 1px solid rgba(50, 208, 146, 1);
    }
  .info
    width calc(100% - 20px)
    line-height 25px
    font-size 12px
    padding 10px
    position absolute
    bottom 30px
    left 0
</style>
