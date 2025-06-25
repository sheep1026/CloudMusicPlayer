const express = require('express');
const multer = require('multer');
const { recognizeSong } = require('./acrcloud');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // 上传文件存储在内存中

// 定义一个 POST 接口，接收文件上传
router.post('/recognize', upload.single('audio'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const result = await recognizeSong(req.file.buffer);
    res.json(result);
  } catch (error) {
    console.error("Error during recognition", error);
    res.status(500).send('Error recognizing song');
  }
});

module.exports = router;