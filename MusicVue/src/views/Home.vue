<template>
  <div class="home">
    <div class="swiper"> <TopNav /></div>
    <SwpierTop />
    <!-- <IconList /> -->
    <MusicList />

    <!-- 悬浮的 AI 识曲按钮 -->
    <router-link to="/recognize" class="floating-button">
      <button>识曲</button>
    </router-link>
  </div>
</template>

<script>
import TopNav from "@/components/home/TopNav.vue";
import SwpierTop from "@/components/home/SwpierTop.vue";
import IconList from "@/components/home/IconList.vue";
import MusicList from "@/components/home/MusicList.vue";

export default {
  name: "Home",
  components: {
    TopNav,
    SwpierTop,
    IconList,
    MusicList,
  },
};
</script>

<style scoped>
.home {
  background-color: #f0f0f0; /* 你可以修改为你想要的背景颜色 */
}


.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
}

.floating-button button {
    background-color: #3AE075;
    color: black;
    font-size: medium;
    font-weight: bold;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;
}

.floating-button button:hover {
    background-color: #35986f;
}
</style>