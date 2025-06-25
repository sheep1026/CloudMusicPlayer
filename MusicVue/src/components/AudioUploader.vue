<!-- sheepovo -->
<template>
    <div>
      <input type="file" accept="audio/*" @change="handleFileChange" ref="fileInput" style="display: none">
      <button @click="openFileDialog">选择音频文件</button>
      <div v-if="fileName">{{ fileName }}</div>
      <button @click="uploadFile" :disabled="!file">识别歌曲</button>
      <div v-if="recognitionResult" style="white-space: pre-line;">
        <h3>识别结果:</h3>
        <pre>{{ recognitionResult }}</pre>
      </div>
      <div v-if="errorMessage" style="color: red;">{{ errorMessage }}</div>
      <div v-if="loading">上传中...</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
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
          const response = await axios.post('http://localhost:3001/recognize', formData, { // 修改端口为 3001
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          this.recognitionResult = JSON.stringify(response.data, null, 2);
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