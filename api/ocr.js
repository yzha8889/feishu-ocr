const FSDK = require('feishu-sdk');

module.exports = async (req, res) => {
  try {
    const FAPI = await FSDK(process.env.APP_ID, process.env.APP_SECRET);
    
    // 获取上传的图片 base64 数据
    const base64 = req.body.image.replace(/^data:image\/\w+;base64,/, '');
    
    // 调用飞书 OCR API
    const text = await FAPI.ai.ocr(base64);
    
    res.json({ text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
