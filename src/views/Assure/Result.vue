<template>
  <div class="assure-result">
    <div class="box">
      <div class="title">保函真伪查询系统</div>
      <van-cell-group :border="false">
        <van-cell title="保函编号" :value="data.code" title-class="subtitle" />
        <van-cell
          title="受益人"
          :value="data.beneficiary"
          title-class="subtitle"
        />
        <van-cell
          title="被担保人"
          :value="data.warrantee"
          title-class="subtitle"
        />
        <van-cell title="项目名称" :value="data.name" title-class="subtitle" />
        <van-cell title="金额" :value="data.amount" title-class="subtitle" />
      </van-cell-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { Button } from "vant";

interface Data {
  code: string; // 保函编号
  amount: number; // 金额
  beneficiary: string; // 受益人
  warrantee: string; // 被担保人
  name: string; // 项目名称
}

@Component
export default class Result extends Vue {
  // accessCode=202865&code=唯鼎2020投保字004号
  private code = "唯鼎2020投保字004号";
  private data: Data = {
    code: "无",
    amount: 0.0, // 金额
    beneficiary: "无",
    warrantee: "无",
    name: "无"
  };

  created(): void {
    const { params, query } = this.$route;
    if (params !== {} && params.code) {
      this.getData(params);
    }
    if (query && query.code) {
      this.getData(query);
    }
  }

  getData(params) {
    console.log(params);
    const res: Data = {
      code: params.code,
      amount: Number(params.amount), // 金额
      warrantee: params.warrantee,
      beneficiary: params.beneficiary,
      name: params.name
    };
    this.data = { ...res };
  }
}
</script>

<style lang="stylus">
.assure-result
  height 100%
  display flex
  align-items center
  justify-content center
  .box
    width calc(90% - 10px)
    padding 30px 10px
    border-radius 6px
    border 1px solid #eee
    .title
      margin-bottom 30px
    .subtitle
      max-width 80px
</style>
