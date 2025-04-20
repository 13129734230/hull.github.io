<script setup lang="ts">
import {getReq} from "../../../../uitls/axios";
import {ref} from 'vue'
const data = ref([])
const  getPictures = async () => {
  const res  = await getReq('https://api.unsplash.com/photos/random',
      {
        headers:{
          "Authorization":"Client-ID jKyqYuZ_dtdiGK3UhiT0f-V6D8kbgsTEirnwfIixJ8c",
          "Accept-Version":"v1"
        }
      })
  data.value.push(res.links.download)
}
const resetChickenSoup = () => {
  data.value = []
  getPictures()
  getPictures()
}
resetChickenSoup()
</script>

<template>
  <div class="container">
    <div class="pictures">
      <template v-if="data?.length">
        <a target="_blank" :href="item" v-for="(item,i) in data" :key="i">
          <img :src="item" alt="随机图" title="查看">
        </a>
      </template>
      <template v-else>
        <img src="../../../../public/daily-loading.jpg" alt="正在加载" title="加载中">
      </template>
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
    width: 100%;
    .pictures{
      width: 100%;
      display: flex;
      flex-direction: column;
      img{
        width: 100%;
        min-height: 400px;
        background: var(--vp-c-text-1);
      }
    }
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