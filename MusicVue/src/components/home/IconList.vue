<template>
  <div class="iconList">
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tuijian"></use>
      </svg>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zhibo"></use>
      </svg>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan"></use>
      </svg>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang"></use>
      </svg>

    </div>
  </div>
</template>

<style lang="less" scoped>
  .iconList {
    width: 80%;
    height: 100px; 
    margin-top: 20px; 
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .iconItem {
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 10%;
    margin-right: 10%;
  }

  .icon {
    width: 50px; /* 原来�? 1rem，假�? 1rem = 50px */
    height: 50px; /* 原来�? 1rem，假�? 1rem = 50px */
  }
</style>
