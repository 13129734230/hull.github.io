<script setup lang="ts">
//控制台组件

</script>

<template>
  <input class="console-view" readonly placeholder="console:" v-bind="$attrs"/>
</template>

<style scoped lang="scss">
  .console-view{
    width: 100%;
    height: 100%;
    min-width: 200px;
    min-height: 40px;
    border-radius: 5px;
    border: 1px solid var(--vp-c-divider);
    display: flex;
    align-items: center;
    padding: 10px;
  }
</style>