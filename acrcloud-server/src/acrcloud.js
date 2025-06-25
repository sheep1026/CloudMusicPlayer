const axios = require('axios');
const FormData = require('form-data');
const crypto = require('crypto');
const { acrcloud } = require('./config');
const request = require('request'); // 引入 request

// 官方示例中的函数，用于构建签名字符串
function buildStringToSign(method, uri, accessKey, dataType, signatureVersion, timestamp) {
  return [method, uri, accessKey, dataType, signatureVersion, timestamp].join('\n');
}

// 官方示例中的函数，用于生成签名
function sign(signString, accessSecret) {
  return crypto.createHmac('sha1', accessSecret)
    .update(Buffer.from(signString, 'utf-8'))
    .digest().toString('base64');
}


async function recognizeSong(fileBuffer) {
  const timestamp = Math.floor(Date.now() / 1000);
  const stringToSign = buildStringToSign(
    'POST',
    '/v1/identify', // Use endpoint from options
    acrcloud.accessKey,
    acrcloud.dataType,
    '1', // signature version fixed to 1
    timestamp
  );
  const signature = sign(stringToSign, acrcloud.accessSecret);

  const formData = {
    sample: fileBuffer,
    access_key: acrcloud.accessKey,
    data_type: acrcloud.dataType,
    signature_version: '1',
    signature: signature,
    sample_bytes: fileBuffer.length,
    timestamp: timestamp,
  };
  
    return new Promise((resolve, reject) => {
        request.post({
          url: `http://${acrcloud.host}/v1/identify`,
          formData: formData,
        }, (error, response, body) => {
          if (error) {
            console.error('Error recognizing song with request:', error.message);
            reject(error);
          } else {
                try {
                    resolve(JSON.parse(body));
                } catch (e){
                    console.error('Error parsing response body:', body)
                    reject('Error parsing response body')
                }
            
          }
        });
      });
  
}


module.exports = {
  recognizeSong,
};