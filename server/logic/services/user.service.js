module.exports = (User) => {  
  /**
   * 
   */
  function getUsers (flag) {
    return new Promise ((resolve, reject) => {
      let query = {};
      
      switch (flag) {
        case "admin":
          query = { admin: true };
          break;

        case "dj": 
          query = { deejay: true };
          break;

        case "user": 
          query = { admin: false, deejay: false };
          break;

        default:
          break;
      }

      User.find(query, (err, users) => {
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