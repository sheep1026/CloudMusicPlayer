<template>
  <!-- 音乐列表容器 -->
  <div class="musicList">
    <!-- 顶部标题和查看更多按钮 -->
    <div class="musicTop">
      <div class="title">热门推荐</div>
      <div class="icon-list-container">
         <!-- <IconList/> -->
      </div>
      <div class="more">更多 ></div>
    </div>
    
    <!-- 音乐项内容容器 -->
    <div class="musicContent">
      <!-- 循环渲染每个音乐项 -->
        <div v-for="item in state.musicList" :key="item.id"  class="music-item-container" >
          <!-- 每个音乐项链接，点击后跳转到详细页面 -->
          <router-link :to="{path:'/itemMusic', query:{id:item.id}}">
            <!-- 显示音乐的封面图 -->
            <div class="music-item">
              <img :src="item.picUrl" alt="音乐封面" />

               <div class="playCount">
                  <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-gl-play-copy"></use>
                    </svg>
                    {{ changeCount(item.playCount) }}
                </div>

              <div class="name">{{ item.name }}</div>
            </div>
           
          </router-link>
          </div>
    </div>
  </div>
</template>

<script>
// 引入API函数和vue的响应式API
import { getMusicList } from "@/request/api/home.js";
import { reactive, onMounted } from "vue";
import IconList from "@/components/home/IconList.vue";

export default {
   components: {
       IconList
  },
  setup() {
    // 音乐列表的响应式数据
    const state = reactive({
      musicList: [],  // 初始化为空列表
    });

    // 格式化播放数，转化为“万”或“亿”显示
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
      return num; // 如果小于10000，直接显示原始数值
    }

    // 获取音乐列表数据
    onMounted(async () => {
      let res = await getMusicList();  // 调用API获取数据
      console.log(res);  // 输出结果查看
      state.musicList = res.data.result;  // 将获取到的音乐数据保存到state中
    });

    return { state, changeCount };  // 返回数据和函数供模板使用
  },
};
</script>

<style lang="less" scoped>
/* 音乐列表容器的样式 */
.musicList {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px 0;
     background-color: #fff; /* 将背景颜色设置为白色 */
}

/* 顶部标题部分的样式 */
.musicTop {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 0 10px;
    border-bottom: 1px solid #e0e0e0;
}

/* 标题文字的样式 */
.title {
    font-size: 18px;
    font-weight: 700;
    color: #333;
    border-bottom: 2px solid red;
    padding-bottom: 5px;
}

/* “更多”文字的样式 */
.more {
    font-size: 14px;
    color: #888;
    cursor: pointer;
    transition: color 0.3s;
}
/* hover 效果 */
.more:hover {
    color: #0056b3;
}
.musicContent {
    width: 100%;
    display: flex;
    flex-wrap: wrap; /* 设置为 wrap，超出时换行 */
    gap: 10px; /* 每个音乐项之间的间距 */
    padding: 10px;
    justify-content: flex-start;
}
.icon-list-container{
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.music-item-container{
    width: calc(20% - 10px); /* 调整宽度为每行显示 5 个，减去间距 */
    box-sizing: border-box;
    padding: 0px 10px 10px;

}
.music-item{
    position: relative;
    width: 100%;
     max-width: 180px;
    height: 200px;
    border-radius: 5px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}

.music-item img{
    width: 100%;
    height: 150px;
    object-fit: cover;
}
.playCount {
    position: absolute;
    top: 5px;
    right: 5px;
    color: #fff;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 2px;
}
.playCount .icon {
    width: 14px;
    height: 14px;
    fill: #fff;
}
.name {
    padding: 5px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 12px;
    color: #333;
    text-align: left;
     overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 1%;
}
</style>