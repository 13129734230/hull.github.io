<template>
  <div class="debounce-view">
    <input type="text" @input="debounceFun" class="input-class" placeholder="防抖输入框...">
    <ConsoleView :value="inputValue"/>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func.apply(context, args);
      timeout = null;
    }, wait);
  };
}
const inputValue = ref()
const debounceFun = debounce((e: any) => {
  inputValue.value = e.target.value
}, 500)

</script>

<style lang="scss">
.debounce-view{
  display: flex;
  align-items: center;
}
.input-class{
  width: 200px;
  height: 40px;
  border-radius: 5px;
  outline: none;
  padding-left: 5px;
  margin-right: 20px;
  border: 1px solid blue;
}
</style>
