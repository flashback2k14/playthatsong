const CryptoJS = require("crypto-js");


module.exports = (secret) => {
  /**
   * 
   */
  function encrypt (text) {
    return CryptoJS.AES.encrypt(text, secret);
  }

  /**
   * 
   */
  function decrypt (text) {
    const pwBytes = CryptoJS.AES.decrypt(text.toString(), secret);
    return pwBytes.toString(CryptoJS.enc.Utf8);
  }

  /**
   * 
   */
  return {
    encrypt: encrypt,
    decrypt: decrypt
  }
}