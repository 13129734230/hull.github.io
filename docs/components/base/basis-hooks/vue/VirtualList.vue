<script setup lang="ts">
  import {ref,onMounted,nextTick} from 'vue'
  import type {Ref} from 'vue'
  const virtualList:Ref<HTMLElement> = ref(null);//外层容器盒子
  const list:Ref<HTMLElement> = ref(null);//内容盒子
  // const topSentinel = ref(null);//顶部占位符
  // const bottomSentinel = ref(null);
  onMounted(()=>{
    virtualList.value = document.getElementById('virtual-list');
    list.value = document.getElementById('list');
    // topSentinel.value = document.getElementById('top-sentinel');
    generateVisibleDom(0)
    // 监听滚动事件
    virtualList.value.addEventListener('scroll', () => {
      const scrollTop = virtualList.value.scrollTop;
      const startIndex = Math.floor(scrollTop / itemHeight);
      generateVisibleDom(startIndex);
    });
    // intersectionObserver.observe(topSentinel.value)
  })
  const itemsLength = 100000; // 列表总列数
  const itemHeight = 30; // 每一列高度
  const containerHeight = 270; // 容器总高度
  const visibleCount = Math.ceil(containerHeight/itemHeight); // 可见区域显示的列数量
  const arrItems = Array.from({length:itemsLength},(_,i) => `item${i+1}`)


  // intersectionObserver方式
  // const intersectionObserver = new IntersectionObserver((entries) => {
  //   // console.log(entries)
  //   entries.forEach(entry => {
  //     if(entry.intersectionRatio){
  //         const scrollTop = virtualList.value.scrollTop;
  //         const startIndex = Math.floor(scrollTop / itemHeight);
  //         generateVisibleDom(startIndex);
  //     }
  //   })
  // }, { threshold: 0.0 })
  // const endDom = ref(null)
  //生成可见区域dom元素
  const generateVisibleDom = (startIndex:number) => {
    const endIndex = startIndex + visibleCount;
    const visibleItems = arrItems.slice(startIndex, endIndex+5);
    list.value.innerHTML = visibleItems.map((item, index) => {
          const top = (startIndex + index) * itemHeight;
          return `<div ${index===visibleCount-1?'class="endItem"':index===0?'class="startItem"':''} class="li"
                    style="position: absolute; top: 0; width: 100%; transform: translateY(${top}px); height: ${itemHeight}px;
                    border: 1px solid gray; text-align: center; box-sizing: border-box;">${item}</div>`;
        }).join('');
    // endDom.value?intersectionObserver.unobserve(endDom.value):''
    // endDom.value = document.querySelector('.endItem');
    // intersectionObserver.observe(endDom.value)
  }
</script>

<template>
  <div>以下列表有10W条数据(不信你拉拉看):</div>
  <div class="virtual-list" id="virtual-list">
    <!-- 顶部占位符 -->
<!--    <div id="top-sentinel"></div>-->
    <div class="list" id="list">
    </div>
    <div class="foot-tip">-没有更多了-</div>
  </div>
</template>

<style scoped lang="scss">
  .virtual-list{
    width: 100%;
    height: 270px;
    background: black;
    overflow-y: auto;
    margin-top:10px;
    .list{
      width: 100%;
      height: calc(30px * 100000);
      position: relative;
    }
    .foot-tip{
      font-size: 12px;
      color: gray;
      padding: 10px;
      text-align: center;
    }
  }
</style>