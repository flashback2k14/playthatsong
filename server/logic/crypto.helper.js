const CryptoJS = require("crypto-js");


module.exports = () => {
  /**
   * 
   */
  function encrypt (text, secret) {
    return CryptoJS.AES.encrypt(text, secret);
  }

  /**
   * 
   */
  function decrypt (text, secret) {
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