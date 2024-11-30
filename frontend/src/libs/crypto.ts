import CryptoJS from "crypto-js";

const Crypto = {
  encrypt: (payload: object) => {
    const token = CryptoJS.AES.encrypt(JSON.stringify(payload), import.meta.env.VITE_SECRET_KEY);
    return token.toString();
  }
}

export default Crypto;