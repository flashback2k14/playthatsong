const jwt = require("jsonwebtoken");
const CryptoHelper = require("./crypto.helper")();


module.exports = (User, tokenSecret, pwSecret) => {
  /**
   * 
   */
  function login (userName, userPassword) {
    return new Promise ((resolve, reject) => {
      User.findOne({ name: userName}, (err, user) => {
        if (err) {
          reject({success: false, message: `Error in Users Route - Login: ${err.message}`});
          return;
        }

        if (!user) {
          reject({success: false, message: "Authentication failed. User not found."});
          return;
        }

        if (userPassword !== CryptoHelper.decrypt(user.password, pwSecret)) {
          reject({success: false, message: "Authentication failed. Wrong password."});
          return;
        }

        const token = jwt.sign(user, tokenSecret, {
          expiresIn: "1d"
        });

        resolve({success: true, token});
      });
    });
  }

  function register (userName, userPassword) {
    return new Promise ((resolve, reject) => {
      User.findOne({name: userName}, (err, user) => {
        if (err) {
          reject({success: false, message: `Error in Users Route - Register - Find: ${err.message}`});
          return;
        }

        if (user) {
          reject({success: false, message: `Username is already registered. Please use another Username.`});
          return;
        }

        const newUser = new User({
          name: userName,
          password: CryptoHelper.encrypt(userPassword, pwSecret)
        });

        newUser.save((err, createdUser) => {
          if (err) {
            reject({success: false, message: `Error in Users Route - Register - Save: ${err.message}`});
            return;
          }
          resolve({success: true, createdUser});
        });
      });
    });
  }

  /**
   * 
   */
  function checkAuthState (req, res, next) {
    const token = req.body.token 
                    || req.query.token 
                    || req.headers["x-access-token"];

    if (token) {
      jwt.verify(token, tokenSecret, (err, decoded) => {
        if (err) {
          return res.status(400).json({success: false, message: "Failed to authenticate token."});    
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).json({success: false, message: "No token provided."});
    }
  }

  /**
   * 
   */
  return {
    login: login,
    register: register,
    checkAuthState: checkAuthState
  }
}