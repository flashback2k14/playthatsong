const jwt = require("jsonwebtoken");

module.exports = (User, tokenSecret, CryptoHelper) => {
  /**
   * 
   */
  function login (userName, userPassword) {
    return new Promise((resolve, reject) => {
      // try to find the user
      User.findOne({ name: userName}, (err, user) => {
        // error handling
        if (err) {
          reject({success: false, message: `Error in Users Route - Login: ${err.message}`});
          return;
        }
        // check if the user is available
        if (!user) {
          reject({success: false, message: "Authentication failed. User not found."});
          return;
        }
        // check if the passwords match
        if (userPassword !== CryptoHelper.decrypt(user.password)) {
          reject({success: false, message: "Authentication failed. Wrong password."});
          return;
        }
        // create the JWT
        jwt.sign(user, tokenSecret, {
          expiresIn: "1d"
        }, (err, token) => {
          // error handling
          if (err) {
            reject({success: false, message: `Authentication failed. Error message: ${err.message}.`});
            return;
          }
          // calc expire time
          let expires = Math.round(Date.now() / 1000) + 86400;
          // return data
          resolve({success: true, token, user, expires});
        });
      });
    });
  }

  function register (userName, userPassword) {
    return new Promise((resolve, reject) => {
      // try to find the user
      User.findOne({name: userName}, (err, user) => {
        // error handling
        if (err) {
          reject({success: false, message: `Error in Users Route - Register: Find: ${err.message}`});
          return;
        }
        // check if user is available
        if (user) {
          reject({success: false, message: `Username is already registered. Please use another Username.`});
          return;
        }
        // create new User object
        const newUser = new User({
          name: userName,
          password: CryptoHelper.encrypt(userPassword)
        });
        // save new User object
        newUser.save((err, createdUser) => {
          // error handling
          if (err) {
            reject({success: false, message: `Error in Users Route - Register: Save: ${err.message}`});
            return;
          }
          // return data
          resolve({success: true, createdUser});
        });
      });
    });
  }

  /**
   * 
   */
  function checkAuthState (req, res, next) {
    // get token from request
    const token = req.body.token 
                    || req.query.token 
                    || req.headers["x-access-token"];
    // check if token is available
    if (token) {
      // verify token
      jwt.verify(token, tokenSecret, (err, decoded) => {
        // error handling
        if (err) {
          // setup error message
          let msg = "Failed to authenticate token.";
          // append error message
          if (err.name === "TokenExpiredError") {
            msg = `${msg} Token expired at ${err.expiredAt}`;
          }
          // append error message
          if (err.name === "JsonWebTokenError") {
            msg = `${msg} Error message: ${err.message}`;
          }
          // return error data
          return res.status(400).json({success: false, message: msg});
        } else {
          // go to the next step
          req.decoded = decoded;
          next();
        }
      });
    } else {
      // return error data
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