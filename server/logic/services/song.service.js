module.exports = (Song, User, SocketHelper) => {
  /**
   * Return all Songs from DB
   * @returns songs {Promise}
   */
  function getSongs () {
    return new Promise ((resolve, reject) => {
      Song.find({}, (err, songs) => {
        if (err) {
          reject({success: false, message: `Error in Songs Route - GetSongs: ${err.message}`});
          return;
        }
        resolve({success: true, songs});
      });
    });
  }

  /**
   * Return one specific Song from DB
   * @param id {String} Song id
   * @returns song {Promise}
   */
  function getSong (id) {
    return new Promise ((resolve, reject) => {
      Song.findOne({_id: id}, (err, song) => {
        if (err) {
          reject({success: false, message: `Error in Songs Route - GetSong: ${err.message}`});
          return;
        }
        resolve({success: true, song});
      });
    });
  }

  /**
   * Helper function to update the user information before up or downvote
   * @param userId {String} User id
   * @returns userData {Promise}
   */
  function _updateUserData (userId) {
    return new Promise ((resolve, reject) => {
      // user by id
      User.findById(userId, (err, foundUser) => {
        // error handling
        if (err) {
          reject({success: false, message: `Error in Songs Route - Upvote: Find User by ID: ${err.message}`});
          return;
        }
        // check if firstVoting is null
        if (!foundUser.firstVoting) {
          // set firstVoting to Date.now
          foundUser.firstVoting = Math.round(Date.now() / 1000);
        } 
        // check if resetVoting is null
        if (!foundUser.resetVoting) {
          // set resetVoting to 1 hour after firstVoting
          foundUser.resetVoting = foundUser.firstVoting + 60 * 3; // * 60;
        }
        // reset all values
        if (foundUser.resetVoting < (Math.round(Date.now() / 1000))) {
          foundUser.availableVotes = 10;
          foundUser.firstVoting = null;
          foundUser.resetVoting = null;
        }
        // check if availableVotes is greater then 0
        if (foundUser.availableVotes <= 0) {
          reject({success: false, message: `No Votes available! Please wait until ${new Date(foundUser.resetVoting * 1000)}!`});
          return;
        }
        // update availableVotes
        foundUser.availableVotes = foundUser.availableVotes - 1;
        // save user data
        foundUser.save((err, updatedUser) => {
          // error handling
          if (err) {
            reject({success: false, message: `Error in Songs Route - Upvote: Save User: ${err.message}`});
            return;
          }
          // return updated user
          resolve(updatedUser);
        });
      });
    });
  }

  /**
   * Upvote Song data
   * @param id {String} Song id
   * @param userId {String} User id
   * @returns success | Song | User {Promise}
   */
  function upvote (id, userId) {
    return new Promise ((resolve, reject) => {
      // update user data
      _updateUserData(userId)
        .then(updatedUser => {
          // find song by id
          Song.findById(id, function (err, foundSong) {
            // error handling
            if (err) {
              reject({success: false, message: `Error in Songs Route - Upvote: Find by ID: ${err.message}`});
              return;
            }
            // update upvotes
            foundSong.upvotes = foundSong.upvotes + 1;
            // save song data
            foundSong.save((err, updatedSong) => {
              // error handling
              if (err) {
                reject({success: false, message: `Error in Songs Route - Upvote: Save: ${err.message}`});
                return;
              }
              // publish changes
              SocketHelper.publishChanges(SocketHelper.EVENTNAME.SONGUPDATED, updatedSong);
              // return modified song
              resolve({success: true, updatedSong, updatedUser});
            });
          });
        })
        .catch(error => reject(error));
    });
  }

  /**
   * Downvote Song data
   * @param id {String} Song id
   * @param userId {String} User id
   * @returns success | Song | User {Promise}
   */
  function downvote (id, userId) {
    return new Promise ((resolve, reject) => {
      // update user data
      _updateUserData(userId)
        .then(updatedUser => {
          // find song by id
          Song.findById(id, function (err, foundSong) {
            // error handling
            if (err) {
              reject({success: false, message: `Error in Songs Route - Downvote: Find by ID: ${err.message}`});
              return;
            }
            // update downvotes
            foundSong.downvotes = foundSong.downvotes + 1;
            // save song data
            foundSong.save((err, updatedSong) => {
              // error handling
              if (err) {
                reject({success: false, message: `Error in Songs Route - Downvote: Save: ${err.message}`});
                return;
              }
              // publish changes
              SocketHelper.publishChanges(SocketHelper.EVENTNAME.SONGUPDATED, updatedSong);
              // return modified song
              resolve({success: true, updatedSong, updatedUser});
            });
          });
        })
        .catch(error => reject(error));
    });
  }

  /**
   * 
   */
  return {
    getSongs: getSongs,
    getSong: getSong,
    upvote: upvote,
    downvote: downvote
  }
}