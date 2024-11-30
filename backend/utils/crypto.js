const CryptoJS = require('crypto-js');

module.exports = {
  decrypt: (data) => {
    try {
      const bytes = CryptoJS.AES.decrypt(data, process.env.VITE_SECRET_KEY);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (err) {
      console.error('Game data decrypt failed:', err.message);
      return {}
    }
  }
}