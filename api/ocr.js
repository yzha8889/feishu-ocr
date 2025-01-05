const FSDK = require('feishu-sdk');
const u2b = require('image-to-base64');

module.exports = async (req, res) => {
  try {
    const FAPI = await FSDK(process.env.APP_ID, process.env.APP_SECRET);
    const base64 = await u2b(req.body.url);
    const text = await FAPI.ai.ocr(base64);
    
    res.json({ text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
