<template>
  <div class="recognition-page">
    <div class="nav"><TopNav /></div>
    <div class="content-wrapper">
      <h2>上传音频文件进行识别</h2>
      <div class="upload-section">
        <input
          type="file"
          accept="audio/*"
          @change="handleFileChange"
          ref="fileInput"
          id="uploadBtn"
          class="file-input"
        />
        <label for="uploadBtn" class="file-button">
          <i class="fa-solid fa-upload"></i> 选择音频文件
        </label>
        <div v-if="fileName" class="file-name">{{ fileName }}</div>
        <button @click="uploadFile" :disabled="!file" class="upload-button">识别</button>
      </div>
<div v-if="recognitionResult" class="result-container">
    <h3>识别结果</h3>
    <div
      v-if="recognitionResult.metadata && recognitionResult.metadata.music && recognitionResult.metadata.music.length > 0"
    >
      <div v-for="(music, index) in recognitionResult.metadata.music" :key="index" class="music-item">
        <div class="music-info">
          <div class="music-title">
            <strong>歌曲:</strong> {{ music.title }}
          </div>
          <div class="music-artist">
            <strong>艺术家:</strong> {{ music.artists.map((artist) => artist.name).join(', ') }}
          </div>
          <div class="music-album">
            <strong>专辑:</strong> {{ music.album.name }}
          </div>
        </div>
         <div class="external-links">
            <template v-if="music.external_metadata && music.external_metadata.spotify && music.external_metadata.spotify.track">
             <a class="link-button spotify" :href="`https://open.spotify.com/track/${music.external_metadata.spotify.track.id}`" target="_blank" rel="noopener noreferrer">Spotify</a>
            </template>
           <template v-if="music.external_metadata && music.external_metadata.deezer && music.external_metadata.deezer.track">
            <a class="link-button deezer"  :href="`https://www.deezer.com/track/${music.external_metadata.deezer.track.id}`" target="_blank" rel="noopener noreferrer">Deezer</a>
           </template>
        </div>
      </div>
    </div>
    <div v-else class="no-result">
      <p>未识别到歌曲</p>
    </div>
  </div>
  <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  <div v-if="loading" class="loading-message">上传中...</div>
  <router-link to="/" class="back-button">返回主页</router-link>
</div>
  </div>
</template>
<script>
import axios from 'axios';
import TopNav from '@/components/home/TopNav.vue';

export default {
  name: 'RecognitionView',
  components: {
    TopNav,
  },
  data() {
    return {
      file: null,
      fileName: '',
      recognitionResult: null,
      errorMessage: null,
      loading: false,
    };
  },
  methods: {
    openFileDialog() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      this.file = event.target.files[0];
      if (this.file) {
        this.fileName = this.file.name;
      } else {
        this.fileName = '';
      }
    },
    async uploadFile() {
      this.loading = true;
      this.errorMessage = null;
      this.recognitionResult = null;
      try {
        const formData = new FormData();
        formData.append('audio', this.file);
        const response = await axios.post('http://localhost:3001/recognize', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        this.recognitionResult = response.data;
      } catch (error) {
        console.error('上传识别出错:', error);
        this.errorMessage = '上传识别出错，请检查控制台日志';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style scoped lang="less">
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css');
.recognition-page {
    display: flex;
    flex-direction: column;
    align-items: center;
   .nav {
      width: 100%;
    }

    .content-wrapper {
      max-width: 600px;
      width: 100%;
      background-color: #3AE075;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      margin: 6%;
    }
  }
  h2 {
      color: #333;
      margin-bottom: 20px;
      font-size: 24px;
  }
    .upload-section{
        margin-bottom: 20px;
         display: flex;
        flex-direction: column;
        align-items: center;
    }
    input[type="file"] {
        display: none;
    }

    label {
        display: inline-block;
        text-transform: uppercase;
        color:#3AE075;
        background-color: black;
        text-align: center;
        padding: 20px 15px; /* 修改 padding，减小上下间距，增左右间距 */
        font-size: 18px;
        font-weight: bold;
        letter-spacing: 1.5px;
        user-select: none;
        cursor: pointer;
        border-radius: 20px;
        margin-top: 5%;
        margin-bottom: 10px;
         i {
              font-size: 20px;
               margin-right: 10px;

         }
         &:active {
            transform: scale(0.9);
        }
    }
    .file-name {
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 14px;
        color: #555;
    }

    .upload-button {
        background-color: black;
        color: #3AE075;
        padding: 15px 25px;  /* 修改 padding，增加文字与边框间距 */
        border: none;
        border-radius: 15px;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        transition: background-color 0.3s ease;
        font-size: medium;
        font-weight: bold;
        margin-top: 5%;
        margin-bottom: 20px;
    }

    .upload-button:hover {
        background-color: #2db65c;
    }

    .upload-button:disabled {
        background-color: black;
        cursor: not-allowed;

    }

    .result-container {
        margin-top: 20px;
        padding: 15px;
        border-radius: 10px;
        background-color: #eaf7e1;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .music-item {
        margin-bottom: 20px;
        border-bottom: 1px solid #ddd;
        padding-bottom: 15px;
    }

    .music-info {
        margin-bottom: 10px;
    }

    .music-title {
        font-size: 18px;
        font-weight: bold;
    }

    .music-artist {
        font-size: 16px;
        margin-top: 5px;
    }

    .music-album {
        font-size: 14px;
        color: #777;
        margin-top: 5px;
    }

    .external-links {
        margin-top: 10px;
        display: flex;
        gap: 10px;
        justify-content: center;
    }

    .link-button {
        padding: 8px 16px;
        border-radius: 20px;
        text-decoration: none;
        color: white;
        font-size: 14px;
        transition: filter 0.3s ease;
    }

    .link-button.spotify {
        background-color: #1db954;
    }

    .link-button.deezer {
        background-color: #ef5466;
    }

    .link-button:hover {
        filter: brightness(0.9);
    }

    .error-message {
        color: red;
        margin-top: 10px;
    }

    .loading-message {
        margin-top: 10px;
        color: #777;
    }

    .back-button {
        margin-top: 20px;
        color: black;
        text-decoration: none;
        font-size: 16px;
    }

    .back-button:hover {
        text-decoration: underline;
    }

    .no-result {
        font-size: 16px;
        color: #777;
    }
</style>