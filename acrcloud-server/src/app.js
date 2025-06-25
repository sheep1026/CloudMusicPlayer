const express = require('express');
const routes = require('./routes');
const cors = require('cors');  // 引入 cors

const app = express();

// 配置 CORS
app.use(cors({
  origin: 'http://localhost:8080', //前端应用的地址
  credentials: true
}));

app.use(express.json()); // 解析 json 请求体
app.use('/', routes);

module.exports = app;