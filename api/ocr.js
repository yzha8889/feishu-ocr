const FSDK = require('feishu-sdk');

module.exports = async (req, res) => {
  // 添加 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理 OPTIONS 请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log('Received request:', req.body);  // 添加日志
    console.log('ENV variables:', process.env.APP_ID, process.env.APP_SECRET);  // 检查环境变量

    const FAPI = await FSDK(process.env.APP_ID, process.env.APP_SECRET);
    console.log('FSDK initialized');  // 添加日志
    
    const base64 = req.body.image;
    console.log('Got image data');  // 添加日志

    const text = await FAPI.ai.ocr(base64);
    console.log('OCR result:', text);  // 添加日志
    
    res.json({ text });
  } catch (error) {
    console.error('Error:', error);  // 添加错误日志
    res.status(500).json({ error: error.message });
  }
};
