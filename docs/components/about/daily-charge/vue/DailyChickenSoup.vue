<script setup lang="ts">
import {getReq} from "../../../../uitls/axios";
import {ref} from 'vue'
const data = ref()
const  getChickenSoup = async () => {
  data.value  = await getReq('https://api.btstu.cn/yan/api.php')
}
getChickenSoup()

const resetChickenSoup = () => {
  getChickenSoup()
}
</script>

<template>
  <div class="container">
    <div>
      {{ data }}
    </div>
    <span class="reset" title="不喜欢" @click="resetChickenSoup">
      👋
      <span class="reset-text">不喜欢</span>
    </span>
  </div>
</template>

<style scoped lang="scss">
  .container{
    position: relative;

    .reset{
      cursor: pointer;
      position: absolute;
      left: 100px;
      top: -45px;
      .reset-text{
        font-size: 12px;
      }
    }
  }
</style>