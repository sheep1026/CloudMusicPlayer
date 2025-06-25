<template>
  <div class="itemMusicList">
    <!-- 顶部区域 -->
    <div class="itemListTop">
      <!-- 左侧播放全部按钮 -->
      <div class="listLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofanganniu"></use> <!-- 播放按钮图标 -->
        </svg>
        <span>播放全部<span>(共{{ itemList.length }}首)</span></span>
      </div>

      <!-- 右侧收藏按钮 -->
      <div class="listRight-button">
        <svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" width="15" height="15"><path d="M6.852,23.438a3.612,3.612,0,0,1-2.121-.7A3.57,3.57,0,0,1,3.4,18.684L4.57,15.065,1.49,12.813A3.625,3.625,0,0,1,3.63,6.261H7.4l1.145-3.57a3.627,3.627,0,0,1,6.906,0h0L16.6,6.261H20.37a3.625,3.625,0,0,1,2.139,6.552L19.43,15.065,20.6,18.684A3.626,3.626,0,0,1,15,22.719l-3-2.206L9,22.72A3.619,3.619,0,0,1,6.852,23.438ZM3.63,9.261a.626.626,0,0,0-.37,1.131l3.956,2.891a1.5,1.5,0,0,1,.542,1.672l-1.5,4.65a.626.626,0,0,0,.966.7l3.889-2.861a1.5,1.5,0,0,1,1.778,0l3.889,2.86a.625.625,0,0,0,.966-.7l-1.5-4.65a1.5,1.5,0,0,1,.542-1.672l3.955-2.891a.626.626,0,0,0-.369-1.131H15.5a1.5,1.5,0,0,1-1.428-1.042L12.6,3.607a.626.626,0,0,0-1.192,0L9.925,8.219A1.5,1.5,0,0,1,8.5,9.261Z"/></svg>
        <span>({{ subscribedCount }})</span>
      </div>
    </div>

    <!-- 音乐列表部分 -->
    <div class="itemList">
      <div class="item" v-for="(item, i) in itemList" :key="i">
        <!-- 每一行音乐项 -->
        <div class="itemLeft" @click="playMusic(i)">
          <!-- 左侧显示音乐序号和名称 -->
          <span class="leftSpan">{{ i + 1 }}</span>
          <div>
            <p>{{ item.name }}</p>
            <span v-for="(artist, index) in item.ar" :key="index">{{ artist.name }}</span>
          </div>
        </div>
        <!-- 右侧显示视频和收藏图标 -->
        <div class="itemRight">
          <svg class="icon bofang" aria-hidden="true" v-if="item.mv != 0">
            <use xlink:href="#icon-shipin"></use> <!-- 视频按钮图标 -->
          </svg>
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use> <!-- 收藏按钮图标 -->
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: ["itemList", "subscribedCount"],

  methods: {
    // 播放音乐，更新播放列表和当前播放索引
    playMusic(i) {
      this.updatePlayList(this.itemList);
      this.updatePlayListIndex(i);
    },
    // 使用 Vuex 进行状态管理
    ...mapMutations(['updatePlayList', 'updatePlayListIndex']),
  }
};
</script>

<style lang="less" scoped>
/* 音乐列表组件的主要容器 */
.itemMusicList {
  width: 100%;  /* 宽度占满屏幕 */
  height: auto; /* 高度自适应 */
  background-color: #fff;  /* 背景为白色 */
  padding: 20px;  /* 内边距 */
  margin-top: 20px;  /* 顶部间距 */
  border-radius: 15px;  /* 圆角处理 */

  /* 顶部区域样式 */
  .itemListTop {
    width: 100%;  /* 容器宽度 */
    height: 60px;  /* 顶部高度 */
    display: flex;  /* 使用flex布局 */
    justify-content: space-between;  /* 左右对齐 */
    align-items: center;  /* 垂直居中 */

    /* 左侧部分：播放按钮和文字 */
    .listLeft {
      display: flex;
      align-items: center;  /* 垂直居中 */
      
      .icon {
        width: 24px;  /* 图标大小 */
        height: 24px;
        fill: #333;  /* 图标颜色 */
        margin-right: 10px;  /* 图标右边距 */
      }

      span {
        font-weight: bold;  /* 文字加粗 */
        font-size: 16px;  /* 文字大小 */
        color: #333;  /* 文字颜色 */

        span {
          font-weight: normal;  /* 子span字体正常 */
          font-size: 14px;  /* 子span字体大小 */
          color: #888;  /* 子span文字颜色 */
        }
      }
    }

    /* 右侧部分：收藏按钮 */
    .listRight-button {
      /*  基本样式  */
      display: inline-flex;
      align-items: center; /* 垂直居中 */
      justify-content: center; /* 水平居中 */
      padding: 8px 16px; /* 设置内边距，让按钮看起来更饱满 */
      background-color: #3AE075; /* 背景颜色 */
      border-radius: 8px; /* 圆角 */
      cursor: pointer; /* 鼠标悬停时显示指针 */
      font-size: 14px; /* 字体大小 */
      font-weight: bold;
      color: black; /* 字体颜色 */
      transition: background-color 0.3s ease; /* 背景颜色过渡效果 */
      white-space: nowrap; /* 防止内容换行 */
      user-select: none; /* 防止用户选择文字 */

      /*  悬停样式  */
      &:hover {
        background-color: #e0e0e0; /* 悬停时的背景颜色 */
      }

      /* 选中/激活样式 */
      &.active {
        background-color: #3AE075; /* 激活时的背景颜色 */
        color: white; /* 激活时字体颜色为白色 */
      }
    }
  }

  /* 音乐列表样式 */
  .itemList {
    width: 100%;  /* 宽度占满屏幕 */

    /* 每一项音乐的样式 */
    .item {
      width: 100%;  /* 宽度占满 */
      height: 80px;  /* 高度设置为80px */
      display: flex;  /* 使用flex布局 */
      justify-content: space-between;  /* 左右对齐 */
      align-items: center;  /* 垂直居中 */
      padding: 10px 0;  /* 上下间距 */

      /* 左侧：音乐信息部分 */
      .itemLeft {
        width: 85%;  /* 占用85%的宽度 */
        display: flex;
        align-items: center;  /* 垂直居中 */

        .leftSpan {
          width: 30px;  /* 序号占30px */
          text-align: center;  /* 序号居中 */
          font-weight: bold;  /* 序号加粗 */
          font-size: 14px;  /* 序号字体大小 */
          color: #555;  /* 序号文字颜色 */
        }

        div {
          margin-left: 15px;  /* 左侧间距 */
          
          p {
            font-weight: bold;  /* 歌曲名加粗 */
            font-size: 16px;  /* 歌曲名字体大小 */
            color: #333;  /* 歌曲名颜色 */
            width: 250px;  /* 歌曲名容器宽度 */
            overflow: hidden;  /* 防止溢出 */
            text-overflow: ellipsis;  /* 溢出显示省略号 */
            white-space: nowrap;  /* 不换行 */
          }

          span {
            font-size: 14px;  /* 歌手名字字体大小 */
            color: #888;  /* 歌手名字颜色 */
            margin-top: 5px;  /* 上边距 */
          }
        }
      }

      /* 右侧：操作按钮部分 */
      .itemRight {
        width: 15%;  /* 占用15%宽度 */
        display: flex;
        justify-content: space-between;  /* 图标均匀分布 */
        align-items: center;  /* 垂直居中 */
        position: relative;

        .icon {
          width: 20px;  /* 图标大小 */
          height: 20px;  /* 图标大小 */
          fill: #999;  /* 图标颜色 */
        }

        /* 视频图标位置调整 */
        .bofang {
          position: absolute;
          left: 0;
        }

        /* 收藏图标位置调整 */
        .liebiao {
          position: absolute;
          right: 0;
        }
      }
    }
  }
}
</style>
