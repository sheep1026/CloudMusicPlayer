<template>
  <!-- 底部音乐播放器容器 -->
  <div class="FooterMusic">
    <!-- 左侧区域显示当前播放的音乐封面和名称 -->
    <div class="footerLeft" @click="updateDetailShow">
      <!-- 显示当前播放歌曲的封面图 -->
      <img :src="playList[playListIndex].al.picUrl" alt="音乐封面" />
      <div>
        <!-- 显示当前播放歌曲的名称 -->
        <p>{{ playList[playListIndex].name }}</p>
        <!-- 提示用户可以横滑切换上下首歌曲，只有在未播放时显示 -->
        <span v-if="!isPlaying">横滑切换上下首哦</span>
      </div>
    </div>
    
    <!-- 右侧控制按钮区域 -->
    <div class="footerRight">
      <!-- 播放/暂停按钮，根据isbtnShow来判断显示图标 -->
      <svg
        class="icon liebiao"
        aria-hidden="true"
        @click="play"
        v-if="isbtnShow" 
      >
        <use xlink:href="#icon-bofanganniu"></use>  <!-- 播放按钮 -->
      </svg>
      <svg class="icon liebiao" aria-hidden="true" @click="play" v-else> 
        <use xlink:href="#icon-weibiaoti--"></use>  <!-- 如果是播放状态，显示暂停按钮 -->
      </svg>
      <!-- 其他控制按钮，暂时未绑定事件 -->
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>  <!-- 返回按钮图标 -->
      </svg>
    </div>

    <!-- 音频播放组件 -->
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
      @ended="onAudioEnded"  
    ></audio>

    <!-- 弹出音乐详情页 -->
    <van-popup
      v-model:show="detailShow"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <!-- 音乐详情组件 -->
      <MusicDetail
        :musicList="playList[playListIndex]"
        :play="play"
        :isbtnShow="isbtnShow"
        :addDuration="addDuration"
      />
    </van-popup>
  </div>
</template>

<script>
// 导入vuex的mapMutations和mapState来处理状态管理
import { mapMutations, mapState } from "vuex";
import MusicDetail from "@/components/item/MusicDetail.vue";  // 导入音乐详情组件

export default {
  data() {
    return {
      interVal: 0,  // 定义一个interval的标识，用于清除定时器
      isPlaying: false, // 添加播放状态标识
    };
  },
  computed: {
    ...mapState(["playList", "playListIndex", "isbtnShow", "detailShow"]),  // 映射vuex状态
  },
  mounted() {
    console.log(this.$refs);  // 输出组件中的引用（用于调试）
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);  // 获取歌词
    this.updateTime();  // 初始化定时器，更新当前播放时间
  },
  updated() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);  // 更新歌词
    this.addDuration();  // 更新歌曲总时长
  },
  methods: {
    // 播放/暂停按钮点击事件
    play: function () {
      // 判断当前音频是否正在播放
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();  // 播放音频
        this.updateIsbtnShow(false);  // 更改按钮图标为暂停
        this.updateTime();  // 启动定时器更新播放进度
        this.isPlaying = true;  // 播放时更新播放状态
      } else {
        this.$refs.audio.pause();  // 暂停音频
        this.updateIsbtnShow(true);  // 更改按钮图标为播放
        clearInterval(this.interVal);  // 清除定时器
        this.isPlaying = false;  // 暂停时更新播放状态
      }
    },
    // 更新歌曲总时长
    addDuration: function () {
      this.updateDuration(this.$refs.audio.duration);  // 更新vuex中的时长
    },
    // 启动定时器，定时更新当前播放时间
    updateTime: function () {
      this.interVal = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime);  // 更新vuex中的当前播放时间
      }, 1000);  // 每1秒更新一次
    },
    // 音频播放结束时的处理
    onAudioEnded() {
      this.updateIsbtnShow(true);  // 设置按钮图标为播放
      clearInterval(this.interVal);  // 清除定时器
      this.isPlaying = false;  // 音乐播放结束后更新播放状态
    },
    ...mapMutations([  // 映射vuex中的mutations
      "updateIsbtnShow",
      "updateDetailShow",
      "updateCurrentTime",
      "updateDuration"
    ]),
  },
  watch: {
    // 监听playListIndex变化，自动播放新的歌曲
    playListIndex: function () {
      this.$refs.audio.autoplay = true;  // 设置音频自动播放
      if (this.$refs.audio.paused) {
        // 如果音频处于暂停状态，显示播放图标
        this.updateIsbtnShow(false);
      }
    },
    // 监听playList变化，自动播放新加入的歌曲
    playList: function () {
      if (this.isbtnShow) {
        this.$refs.audio.autoplay = true;  // 设置音频自动播放
        this.updateIsbtnShow(false);  // 显示播放图标
      }
    },
  },
  components: {
    MusicDetail,  // 注册音乐详情组件
  },
};
</script>

<style lang="less" scoped>
/* 底部播放器样式 */
.FooterMusic {
  width: 100%;  /* 容器宽度占满屏幕 */
  height: 50px;  /* 容器高度50px */
  background-color: #fff;  /* 背景色为白色 */
  position: fixed;  /* 固定定位 */
  bottom: 0;  /* 位于页面底部 */
  border-top: 1px solid #ccc;  /* 顶部边框，浅灰色 */
  display: flex;  /* 使用flex布局 */
  padding: 10px 20px;  /* 内边距，上下10px，左右20px */
  justify-content: space-between;  /* 子元素两端对齐 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);  /* 底部阴影效果 */
  margin-top: 10%;
}

/* 左侧部分，显示歌曲封面和名称 */
.footerLeft {
  width: 60%;  /* 左侧宽度占60% */
  height: 100%;  /* 高度100% */
  display: flex;  /* 使用flex布局 */
  align-items: center;  /* 垂直居中 */
  gap: 10px;  /* 元素间隔10px */
}

.footerLeft img {
  width: 50px;  /* 图片宽度50px */
  height: 50px;  /* 图片高度50px */
  border-radius: 50%;  /* 圆形图片 */
  object-fit: cover;  /* 保持比例填充容器 */
}

.footerLeft p {
  font-size: 16px;  /* 歌曲名称字体大小 */
  font-weight: bold;  /* 加粗 */
  color: #333;  /* 字体颜色 */
  margin: 0;  /* 去除默认外边距 */
}

.footerLeft span {
  font-size: 12px;  /* 提示文字字体大小 */
  color: #888;  /* 提示文字颜色 */
}

/* 右侧部分，控制按钮 */
.footerRight {
  width: 30%;  /* 右侧宽度占30% */
  height: 100%;  /* 高度100% */
  display: flex;  /* 使用flex布局 */
  justify-content: space-around;  /* 控制按钮均匀分布 */
  align-items: center;  /* 垂直居中 */
}

.footerRight .icon {
  width: 30px;  /* 图标宽度30px */
  height: 30px;  /* 图标高度30px */
  fill: #333;  /* 图标颜色 */
}

/* 音乐播放进度条和时长可以添加样式，如果需要的话 */
</style>
