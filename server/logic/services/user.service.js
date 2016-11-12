module.exports = (User) => {  
  /**
   * 
   */
  function getUsers (flag) {
    return new Promise ((resolve, reject) => {
      switch (flag) {
        case "admin":
          User.find({admin: true}, (err, users) => {
            if (err) {
              reject({success: false, message: `Error in Users Route - GetUsers: ${err.message}`});
              return;
            }
            resolve({success: true, users});
          });
          break;

        case "dj": 
          User.find({deejay: true}, (err, users) => {
            if (err) {
              reject({success: false, message: `Error in Users Route - GetUsers: ${err.message}`});
              return;
            }
            resolve({success: true, users});
          });
          break;

        case "user": 
          User.find({admin: false, deejay: false}, (err, users) => {
            if (err) {
              reject({success: false, message: `Error in Users Route - GetUsers: ${err.message}`});
              return;
            }
            resolve({success: true, users});
          });
          break;

        default:
          User.find({}, (err, users) => {
            if (err) {
              reject({success: false, message: `Error in Users Route - GetUsers: ${err.message}`});
              return;
            }
            resolve({success: true, users});
          });
          break;
      }
    });
  }

  /**
   * 
   */
  function getUser (id) {
    return new Promise ((resolve, reject) => {
      User.findById(id, (err, user) => {
        if (err) {
          reject({success: false, message: `Error in Users Route - GetUser: ${err.message}`});
          return;
        }
        resolve({success: true, user});
      });
    });
  }

  /**
   * 
   */
  return {
    getUsers: getUsers,
    getUser: getUser
  }
}