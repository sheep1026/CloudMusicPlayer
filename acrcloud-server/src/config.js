require('dotenv').config();

module.exports = {
  acrcloud: {
    host: process.env.ACRCLOUD_HOST,
    accessKey: process.env.ACRCLOUD_ACCESS_KEY,
    accessSecret: process.env.ACRCLOUD_ACCESS_SECRET,
    dataType: process.env.ACRCLOUD_DATA_TYPE,
  },
  port: process.env.PORT || 3001, // 默认端口为 3001
};