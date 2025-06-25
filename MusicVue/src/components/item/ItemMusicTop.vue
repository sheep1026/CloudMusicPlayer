<!-- <template>
  <div class="itemMusicTop">
    <img :src="playlist.coverImgUrl" alt="" class="bgimg" />
    <div class="itemLeft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="itemRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
  </div>
  
  <div class="itemTopContent">
    <div class="contentLeft">
      <img :src="playlist.coverImgUrl" alt="" />
      <div class="palyCount">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gl-play-copy"></use>
        </svg>
        <span>{{ changeCount(playlist.playCount) }}</span>
      </div>
    </div>
    <div class="contentRight">
      <p class="rightP_one">{{ playlist.name }}</p>
      <div class="right_img">
        <img :src="playlist.creator.backgroundUrl" alt="" />
        <span>{{ playlist.creator.nickname }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </div>
      <p class="rightP_two">
        <span>{{ playlist.description }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </p>
    </div>
  </div>
  
  <div class="itemTopFooter">
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
      </svg>
      <span>{{ playlist.commentCount }}</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>{{ playlist.shareCount }}</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <span>下载</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-show_duoxuan"></use>
      </svg>
      <span>更多</span>
    </div>
  </div>
</template>

<script>
export default {
  setup(props) {
    // 通过props进行传值，判断如果数据拿不到，就获取sessionStorage中的
    props.playlist.creator = "";

    // 对播放量的处理
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    return { changeCount };
  },
  props: ["playlist"],
};
</script>

<style lang="less" scoped>
.itemMusicTop {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0 20px;
  background-color: #cd5f5f;

  .itemLeft,
  .itemRight {
    width: 25%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;

    span {
      font-size: 18px; /* 增大字体，提升可读性 */
    }

    .icon {
      fill: #fff;
      width: 24px;
      height: 24px;
    }
  }

  .bgimg {
    width: 100%;
    height: 250px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    filter: blur(20px);
  }
}

.itemTopContent {
  width: 100%;
  height: 200px;
  padding: 20px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .contentLeft {
    width: 35%;
    height: 100%;
    position: relative;

    img {
      width: 150px;
      height: 150px;
      border-radius: 10px;
    }

    .palyCount {
      position: absolute;
      bottom: 10px;
      right: 10px;
      display: flex;
      align-items: center;

      .icon {
        width: 16px;
        height: 16px;
        margin-right: 5px;
      }

      span {
        font-size: 14px;
        color: #fff;
      }
    }
  }

  .contentRight {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .rightP_one {
      font-size: 20px;
      font-weight: bold;
      color: #fff;
    }

    .right_img {
      display: flex;
      align-items: center;
      color: #ccc;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }

      span {
        margin-left: 10px;
        font-size: 14px;
      }

      .icon {
        width: 16px;
        height: 16px;
        margin-left: 10px;
      }
    }

    .rightP_two {
      font-size: 14px;
      color: #ccc;
      line-height: 1.5;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        width: 90%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .icon {
        width: 14px;
        height: 14px;
      }
    }
  }
}

.itemTopFooter {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #e17191;

  .footerItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;

    .icon {
      fill: #fff;
      width: 22px;
      height: 22px;
    }

    span {
      margin-top: 5px;
      font-size: 14px;
    }
  }
}
</style> -->
<template>
  <div class="itemMusicTop">
    <img :src="playlist.coverImgUrl" alt="" class="bgimg" />
    <div class="itemLeft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
    </div>
    <div class="itemRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
  </div>
  
  <div class="itemTopContent">
    <div class="contentLeft">
      <img :src="playlist.coverImgUrl" alt="" />
      <div class="palyCount">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gl-play-copy"></use>
        </svg>
        <span>{{ changeCount(playlist.playCount) }}</span>
      </div>
    </div>
    <div class="contentRight">
      <p class="rightP_one">{{ playlist.name }}</p>
      <div class="right_img">
        <img :src="playlist.creator.backgroundUrl" alt="" />
        <span>{{ playlist.creator.nickname }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </div>
      <p class="rightP_two">
        <span>{{ playlist.description }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </p>
    </div>
  </div>
  

</template>

<script>
export default {
  setup(props) {
    // 通过props进行传值，判断如果数据拿不到，就获取sessionStorage中的
    props.playlist.creator = "";

    // 对播放量的处理
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    return { changeCount };
  },
  props: ["playlist"],
};
</script>

<style lang="less" scoped>
.itemMusicTop {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0 20px;


  .itemRight {
    width: 25%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: #fff;

    span {
      font-size: 18px; /* 增大字体，提升可读性 */
    }

    .icon {
      fill: #fff;
      width: 24px;
      height: 24px;
      margin: 20px;
    }
  }
}

.bgimg {
  width: 100%;
  height: 400px; /* 增大背景图片的高度，确保覆盖顶部和底部区域 */
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  filter: blur(15px); /* 设置适当的模糊度 */
}

.itemTopContent {
  width: 100%;
  height: 200px;
  padding: 20px;
  margin-top: 80px; /* 使内容区域不会被导航条遮挡 */
  position: relative; /* 确保内容区域在背景图之上 */
  display: flex;
  justify-content: space-between;
  align-items: center;

  .contentLeft {
    width: 35%;
    position: relative;

    img {
      width: 150px;
      height: 150px;
      border-radius: 10px;
    }

    .palyCount {
      position: absolute;
      bottom: 10px;
      right: 10px;
      display: flex;
      align-items: center;

      .icon {
        width: 16px;
        height: 16px;
        margin-right: 5px;
      }

      span {
        font-size: 14px;
        color: #fff;
      }
    }
  }

  .contentRight {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .rightP_one {
      font-size: 20px;
      font-weight: bold;
      color: #fff;
    }

    .right_img {
      display: flex;
      align-items: center;
      color: #ccc;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }

      span {
        margin-left: 10px;
        font-size: 14px;
      }

      .icon {
        width: 16px;
        height: 16px;
        margin-left: 10px;
      }
    }

    .rightP_two {
      font-size: 14px;
      color: #ccc;
      line-height: 1.5;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        width: 90%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .icon {
        width: 14px;
        height: 14px;
      }
    }
  }
}

.itemTopFooter {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  z-index: 2; /* 确保底部区域显示在内容之上 */

  .footerItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;

    .icon {
      fill: #fff;
      width: 22px;
      height: 22px;
    }

    span {
      margin-top: 5px;
      font-size: 14px;
    }
  }
}
</style>
