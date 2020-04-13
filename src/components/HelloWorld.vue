<template>
  <div class="hello">
    <van-button type="primary">{{ msg }}</van-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Button } from "vant";

@Component({
  components: {
    [Button.name]: Button
  }
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.hello
  margin 40px 0 0
</style>
