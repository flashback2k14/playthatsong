module.exports = (User) => {  
  /**
   * 
   */
  function getUsers () {
    return new Promise ((resolve, reject) => {
      User.find({}, (err, users) => {
        if (err) {
          reject({success: false, message: `Error in Users Route - getUsers: ${err.message}`});
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
      User.findOne({_id: id}, (err, user) => {
        if (err) {
          reject({success: false, message: `Error in Users Route - getUser: ${err.message}`});
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