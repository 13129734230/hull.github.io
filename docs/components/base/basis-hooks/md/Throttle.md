## 节流函数（Throttle）

<ThrottleVue/>

:::code-group
```vue [ts]
<script setup lang="ts">
  import {ref,computed} from 'vue'
  function throttle<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
    let lastTime:number = 0;
    let timer:null|number = null;
    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
      const context = this;
      const now:number = Date.now();
      clearTimeout(timer);
      if (now - lastTime >= wait) {
        func.apply(context, args);
        lastTime = now
      }else{
        //保证最后一次操作被执行
        timer = setTimeout(()=>{
          func.apply(context, args);
        },wait)
      }
    };
  }
  const x = ref(0)
  const y = ref(0)
  const moveCoordinates = computed(() => {
    return {
      top:y.value+'px',
      left:x.value+'px'
    }
  })
  const throttleFun = throttle((e: any) => {
    if(e.target.className!=='throttle-view'){
      return
    }
    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) {
      // 鼠标从父元素移动到子元素
      return;
    }
    const {layerX,layerY} = e
    x.value = layerX-5
    y.value = layerY+5
  }, 500)
</script>
```
```vue [js]
<script setup>
  import {ref,computed} from 'vue'
  function throttle(func,wait) {
    let lastTime = 0;
    let timer = null;
    return function (...args) {
      const context = this;
      const now = Date.now();
      clearTimeout(timer);
      if (now - lastTime >= wait) {
        func.apply(context, args);
        lastTime = now
      }else{
        //保证最后一次操作被执行
        timer = setTimeout(()=>{
          func.apply(context, args);
        },wait)
      }
    };
  }

  const x = ref(0)
  const y = ref(0)
  const moveCoordinates = computed(() => {
    return {
      top:y.value+'px',
      left:x.value+'px'
    }
  })
  const throttleFun = throttle((e: any) => {
    if(e.target.className!=='throttle-view'){
      return
    }
    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) {
      // 鼠标从父元素移动到子元素
      return;
    }
    const {layerX,layerY} = e
    x.value = layerX-5
    y.value = layerY+5
  }, 500)
</script>
```
```html [html-css]
<template>
    <div class="throttle-view" @mousemove="throttleFun">
        <div class="move-div" :style="moveCoordinates"></div>
    </div>
</template>

<style lang="scss">
    .throttle-view{
        width: 100%;
        height: 300px;
        display: flex;
        align-items: center;
        background: black;
        position: relative;
    }
    .move-div{
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: green;
        position: absolute;
        left: 0;
        top: 0;
        transition: all linear .1s;
    }
</style>


```
:::
