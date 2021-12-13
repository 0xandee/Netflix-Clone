var aes256 = require("aes256");
//the secret key used for encrypting and decrypting messages
require('dotenv').config();
const secret_key = process.env.REACT_APP_SECRET_KEY;
//returns the encrypted text

export const to_Encrypt = (text) => {
  
  var encrypted = aes256.encrypt(secret_key, text);
  return encrypted;
};

//welcome message is not decrypted
export const to_Decrypt = (cipher, username) => {
  if (cipher === undefined){
    return;
  }
  if (cipher.startsWith("Welcome")) {
    return cipher;
  }

  if (cipher.startsWith(username)) {
    return cipher;
  }

  else {
    var decrypted = aes256.decrypt(secret_key, cipher);
    return decrypted;
  }
  //decryped message is returned
 
};