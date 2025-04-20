<template>
  <div class="loading">
    <div class="charge"></div>
  </div>
</template>

<style scoped lang="scss">
 .loading{
   width: 64px;
   height: 32px;
   position: relative;
   box-sizing: border-box;
   .charge{
     position: absolute;
     width: 100%;
     height: 100%;
     border: 2px solid var(--vp-c-text-1);
     border-radius:9px;
     &:before{
       content: '';
       width: 50px;
       height: 22px;
       position: absolute;
       top: 50%;
       transform: translateY(-50%);
       left: 3px;
       border-radius: 5px;
       z-index: 5;
       animation: loading-charge 10s linear infinite;
       transition: all linear 0.3s;
     }
     &:after{
       content: '';
       width: 2px;
       height: 10px;
       background-color: var(--vp-c-text-1);
       position: absolute;
       right: -6px;
       top: 50%;
       transform: translateY(-50%);
     }
   }
 }

 @keyframes loading-charge {
   0%{
     width: 1px;
     background-color: #f00;
   }
   19%{
     width: 10px;
     background-color: #f00;
   }
   20%{
     width: 10px;
     background-color: #f7b530;
   }
   69%{
     width: 34px;
     background-color: #f7b530;
   }
   70%{
     width: 34px;
     background-color: #00cb00;
   }
   100%{
     width: 50px;
     background-color: #00cb00;
   }
 }
</style>