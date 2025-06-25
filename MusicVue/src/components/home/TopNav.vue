// src/components/home/TopNav.vue
<template>
  <div class="topNav">
    <div class="topleft">
      <svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" width="40" height="40"><path d="M23.074,3.842a1.5,1.5,0,0,0-1.635.325L17.728,7.879,13.061,3.212a1.5,1.5,0,0,0-2.122,0L6.272,7.879,2.561,4.167A1.5,1.5,0,0,0,0,5.228V16.5A5.507,5.507,0,0,0,5.5,22h13A5.507,5.507,0,0,0,24,16.5V5.228A1.5,1.5,0,0,0,23.074,3.842ZM21,16.5A2.5,2.5,0,0,1,18.5,19H5.5A2.5,2.5,0,0,1,3,16.5V8.849l2.212,2.212a1.5,1.5,0,0,0,2.121,0L12,6.394l4.667,4.667a1.5,1.5,0,0,0,2.121,0L21,8.849Z"/></svg>

      <div class="sitename" :style="{ color: siteColor }">
        {{ siteName }}
      </div>
    </div>
    <div class="topContent">
      <span @click="goToInfoUser">我的</span>
      <span :class="{ active: activeTab === 'discover' }">发现</span>
      <span>云村</span>
      <span>视频</span>
      <span>音乐人</span>
      <span>关注</span>
    </div>
    <div class="topRight">
      <svg class="icon" aria-hidden="true" @click="goToSearch">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';

const router = useRouter();

// 定义 props 接收父组件传递的数据
const props = defineProps({
  siteName: {
    type: String,
    default: 'music' // 设置默认值
  },
  siteColor: {
    type: String,
    default: '#000'
  },
  activeTab: {
    type: String,
    default: 'discover'
  },
});
// 跳转到用户信息页面
const goToInfoUser = () => {
  router.push('/infoUser');
};

// 跳转到搜索页面
const goToSearch = () => {
  router.push('/search');
};

</script>

<style lang="less" scoped>
/* 顶部导航样式 */
.topNav {
  width: 100%;
  height: 60px;
  background-color: #3AE075;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sitename {
  font-weight: bold;
  font-size: 30px;
  align-content: center;
  margin-left: 10%;
  font-family: 'ubuntu';
}

/* 左侧区域样式 */
.topleft {
  width: 10%;
  display: flex;
  justify-content: center;
}

.topleft .icon {
  width: 25px;
  height: 25px;
  fill: #333;
}

/* 中间导航内容样式 */
.topContent {
  width: 60%;
  height: 100%;
  display: flex;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  gap: 50px;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
}

.topContent span {
  cursor: pointer;
}

/* 激活项样式，突出显示当前激活的导航项 */
.active {
  font-weight: 900;
  color: #000;
}

/* 右侧区域样式 */
.topRight {
  width: 10%;
  display: flex;
  justify-content: center;
}

.topRight .icon {
  width: 25px;
  height: 25px;
  fill: #333;
  cursor: pointer;
}

/* 图标的悬浮效果 */
.topRight .icon:hover,
.topleft .icon:hover {
  fill: #000;
}
</style>