## 虚拟列表（VirtualList）

<VirtualListVue/>

:::code-group
```vue [ts]
<script setup lang="ts">
  import {ref,onMounted} from 'vue'
  import type {Ref} from 'vue'
  const virtualList:Ref<HTMLElement> = ref(null);//容器盒子
  const list:Ref<HTMLElement> = ref(null);//内容盒子
  
  onMounted(()=>{
    virtualList.value = document.getElementById('virtual-list');
    list.value = document.getElementById('list');
    generateVisibleDom(0)
    // 监听滚动事件
    virtualList.value.addEventListener('scroll', () => {
      const scrollTop = virtualList.value.scrollTop;
      const startIndex = Math.floor(scrollTop / itemHeight);
      generateVisibleDom(startIndex);
    });
  })
  
  const itemsLength = 100000; // 列表总列数
  const itemHeight = 30; // 每一列高度
  const containerHeight = 270; // 容器总高度
  const visibleCount = Math.ceil(containerHeight/itemHeight); // 可见区域显示的列数量
  const arrItems = Array.from({length:itemsLength},(_,i) => `item${i+1}`)

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
  }
</script>
```
```vue [js]
<script setup>
  import {ref,onMounted} from 'vue'
  const virtualList = ref(null);//容器盒子
  const list = ref(null);//内容盒子
  
  onMounted(()=>{
    virtualList.value = document.getElementById('virtual-list');
    list.value = document.getElementById('list');
    generateVisibleDom(0)
    // 监听滚动事件
    virtualList.value.addEventListener('scroll', () => {
      const scrollTop = virtualList.value.scrollTop;
      const startIndex = Math.floor(scrollTop / itemHeight);
      generateVisibleDom(startIndex);
    });
  })
  
  const itemsLength = 100000; // 列表总列数
  const itemHeight = 30; // 每一列高度
  const containerHeight = 270; // 容器总高度
  const visibleCount = Math.ceil(containerHeight/itemHeight); // 可见区域显示的列数量
  const arrItems = Array.from({length:itemsLength},(_,i) => `item${i+1}`)

  //生成可见区域dom元素
  const generateVisibleDom = (startIndex) => {
    const endIndex = startIndex + visibleCount;
    const visibleItems = arrItems.slice(startIndex, endIndex+5);
    list.value.innerHTML = visibleItems.map((item, index) => {
          const top = (startIndex + index) * itemHeight;
          return `<div ${index===visibleCount-1?'class="endItem"':index===0?'class="startItem"':''} class="li"
                    style="position: absolute; top: 0; width: 100%; transform: translateY(${top}px); height: ${itemHeight}px;
                    border: 1px solid gray; text-align: center; box-sizing: border-box;">${item}</div>`;
        }).join('');
  }
</script>
```
```html [html-css]
<template>
  <div>以下列表有10W条数据(不信你拉拉看):</div>
  <div class="virtual-list" id="virtual-list">
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
```

::: tip 
关于以上虚拟列表实现效果，还可进一步优化，如使用intersectionObserver替代scroll监听事件，但代码思路需变动，
intersectionObserver需要有哨兵元素，分别为头部哨兵元素和尾部哨兵元素来做标记点。也可以缓冲已渲染的dom，
来减少对dom的操作。另外还需注意避免列表滚动时出现白屏问题等。
:::