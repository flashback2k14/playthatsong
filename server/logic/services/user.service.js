module.exports = (User) => {  
  /**
   * 
   */
  function getUsers () {
    return new Promise ((resolve, reject) => {
      User.find({}, (err, users) => {
        if (err) {
          reject({success: false, message: `Error in Users Route - GetUsers: ${err.message}`});
          return;
        }
        resolve({success: true, users});
      });
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