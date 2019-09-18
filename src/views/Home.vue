<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { remInit, filterTime } from "@/utils/utils";
// const components = Vue.extend({
//   // 类型推断已启用

// })
@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  public time: number
  constructor() {
    super()
    this.time = Date.now()
  }
  public getTime(): string{
    return filterTime(this.time)
  }
}
let home = new Home()
console.log(home.getTime());

</script>
