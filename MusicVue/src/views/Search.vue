<template>
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <input
      type="text"
      placeholder="搜索歌曲或歌手"
      v-model="searchKey"
      @keydown.enter="enterKey"
    />
  </div>

  <div class="searchHistory" v-if="keyWorldList.length > 0">
    <span class="searchSpan">历史搜索</span>
    <div class="searchItems">
      <span
        v-for="item in keyWorldList"
        :key="item"
        class="spanKey"
        @click="searchHistory(item)"
      >
        {{ item }}
      </span>
      <svg class="icon" aria-hidden="true" @click="delHistory">
        <use xlink:href="#icon-shanchu"></use>
      </svg>
    </div>
  </div>

  <div class="itemList" v-if="searchList.length > 0">
    <div class="item" v-for="(item, i) in searchList" :key="i">
      <div class="itemLeft" @click="updateIndex(item)">
        <span class="leftSpan">{{ i + 1 }}</span>
        <div>
          <p>{{ item.name }}</p>
          <span v-for="(artist, index) in item.artists" :key="index">{{ artist.name }}</span>
        </div>
      </div>
      <div class="itemRight">
        <svg class="icon bofang" aria-hidden="true" v-if="item.mvid !== 0">
          <use xlink:href="#icon-shipin"></use>
        </svg>
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchMusic } from "@/request/api/home.js";

export default {
  data() {
    return {
      keyWorldList: [],
      searchKey: "",
      searchList: [],
    };
  },
  mounted() {
    this.keyWorldList = JSON.parse(localStorage.getItem("keyWorldList"))
      ? JSON.parse(localStorage.getItem("keyWorldList"))
      : [];
  },
  methods: {
    enterKey: async function () {
      if (this.searchKey !== "") {
        this.keyWorldList.unshift(this.searchKey);
        // 去重
        this.keyWorldList = [...new Set(this.keyWorldList)];
        // 固定长度
        if (this.keyWorldList.length > 10) {
          this.keyWorldList.splice(this.keyWorldList.length - 1, 1);
        }
        localStorage.setItem("keyWorldList", JSON.stringify(this.keyWorldList));

        let res = await getSearchMusic(this.searchKey);
        this.searchList = res.data.result.songs;
        this.searchKey = "";
      }
    },
    delHistory: function () {
      localStorage.removeItem("keyWorldList");
      this.keyWorldList = [];
    },
    searchHistory: async function (item) {
      let res = await getSearchMusic(item);
      this.searchList = res.data.result.songs;
    },
    updateIndex: function (item) {
      item.al = item.album;
      item.al.picUrl = item.album.artist.img1v1Url;
      this.$store.commit("pushPlayList", item);
      this.$store.commit("updatePlayListIndex", this.$store.state.playList.length - 1);
    }
  },
};
</script>

<style lang="less" scoped>
.searchTop {
  width: 100%;
  height: 50px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  svg.icon {
    width: 24px;
    height: 24px;
    fill: #666;
    transition: transform 0.2s ease;
  }

  svg.icon:hover {
    transform: scale(1.1);
  }

  input {
    margin-left: 16px;
    border: none;
    border-radius: 8px;
    width: 80%;
    padding: 12px;
    font-size: 16px;
    outline: none;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: #333;

    &::placeholder {
      color: #aaa;
    }

    &:focus {
      border: 1px solid #cd5f5f;
    }
  }
}

.searchHistory {
  width: 100%;
  padding: 16px;
  background-color: #fafafa;
  margin-top: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  .searchSpan {
    font-weight: 700;
    font-size: 18px;
    color: #333;
    margin-bottom: 8px;
    display: inline-block;
  }

  .searchItems {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .spanKey {
    padding: 8px 16px;
    background-color: #f5f5f5;
    border-radius: 16px;
    font-size: 14px;
    color: #666;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #cd5f5f;
      color: white;
    }
  }

  .icon {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 16px;
    top: 16px;
    cursor: pointer;
    fill: #999;
    transition: fill 0.2s ease;
  }

  .icon:hover {
    fill: #cd5f5f;
  }
}

.itemList {
  width: 100%;
  padding: 16px 0;
  background-color: #fff;
  margin-top: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .item {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
    padding: 12px 0;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f7f7f7;
    }

    .itemLeft {
      width: 85%;
      display: flex;
      align-items: center;

      .leftSpan {
        font-size: 18px;
        color: #333;
        margin-right: 12px;
        font-weight: bold;
      }

      div {
        p {
          font-size: 16px;
          color: #333;
          margin-bottom: 4px;
        }
        span {
          font-size: 14px;
          color: #999;
        }
      }
    }

    .itemRight {
      width: 15%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      position: relative;
      
      .icon {
        width: 24px;
        height: 24px;
        fill: #cd5f5f;
        cursor: pointer;
        transition: transform 0.2s ease, fill 0.2s ease;

        &:hover {
          transform: scale(1.1);
          fill: #ff7f7f;
        }
      }

      .bofang {
        margin-left: 12px;
      }

      .liebiao {
        margin-left: 12px;
      }
    }
  }
}
</style>
