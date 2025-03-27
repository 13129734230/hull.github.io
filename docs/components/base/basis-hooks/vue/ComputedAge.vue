<template>
  <div class="computedAge-view">
    <input type="date" placeholder="请选择出生年月" @change="dateChange" :value="defValue">
    <div>
      <ConsoleView :value="computedDate"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue'
  const defValue = ref('1999-01-02')
  const computedDate = ref('18岁');

  const computedAgeFun = (birthday:string) => {
    // 将出生日期转换为Date对象
    const birthDate = new Date(birthday);
    const today = new Date();

    // 计算年份差
    let age = today.getFullYear() - birthDate.getFullYear();

    // 计算月份差
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // 实际月份
    const realMonth = Math.abs(monthDiff<0?monthDiff+12:monthDiff);

    // 如果月份差小于0，或者月份差为0但日期差小于0，年龄减1
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    computedDate.value = age+'周岁 '+realMonth+'个月';
  }

  const dateChange = (e:ElementEventMap) => {
    defValue.value = e.target.value
    computedAgeFun(defValue.value)
  }
  computedAgeFun(defValue.value)
</script>

<style scoped lang="scss">
  .computedAge-view{
    display: flex;
    align-items: center;
    gap: 20px;
  }
</style>