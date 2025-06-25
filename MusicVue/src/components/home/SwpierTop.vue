<template>
  <div id="swiperTop" class="swiper-container">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getBanner } from "@/request/api/home.js";
import { reactive, onMounted } from "vue";

export default {
  setup() {
    const state = reactive({
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg",
      ],
    });

    onMounted(async () => {
      let res = await getBanner();
      state.images = res.data.banners;
      console.log(res);
    });

    return { state };
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
    width: 90%; /* 设置宽度为 90% */
    max-width: 1200px; /* 设置最大宽度 */
    margin: 10px auto; /* 设置左右外边距为 auto，实现水平居中 */
    border-top: 1px solid #e0e0e0; /* 上边框 */
    border-bottom: 1px solid #e0e0e0; /* 下边框 */
    padding: 10px 0; /* 上下内边距 */
    box-sizing: border-box; /* 保证内边距不影响元素宽度 */
    background-color: #fff;  /* 将背景颜色设置为白色 */
}

#swiperTop {
  .van-swipe {
    width: 100%;
    height: 280px;
    
    .van-swipe-item {
      padding: 0 10px;
      
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    
    .van-swipe__indicator--active {
      background-color: rgb(219, 130, 130);
    }
  }
}
</style>