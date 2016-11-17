module.exports = (Song, SocketHelper) => {
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
   * 
   */
  function upvote (id) {
    return new Promise ((resolve, reject) => {
      Song.findById(id, function (err, song) {
        if (err) {
          reject({success: false, message: `Error in Songs Route - Upvote: Find by ID: ${err.message}`});
          return;
        }
        song.upvotes = song.upvotes + 1;
        song.save((err, updatedSong) => {
          if (err) {
            reject({success: false, message: `Error in Songs Route - Upvote: Save: ${err.message}`});
            return;
          }
          // publish changes
          SocketHelper.publishChanged(SocketHelper.EVENTNAME.SONGUPDATED, updatedSong);
          // return modified song
          resolve({success: true, updatedSong});
        });
      });
    });
  }

  /**
   * 
   */
  function downvote (id) {
    return new Promise ((resolve, reject) => {
      Song.findById(id, function (err, song) {
        if (err) {
          reject({success: false, message: `Error in Songs Route - Downvote: Find by ID: ${err.message}`});
          return;
        }
        song.downvotes = song.downvotes + 1;
        song.save((err, updatedSong) => {
          if (err) {
            reject({success: false, message: `Error in Songs Route - Downvote: Save: ${err.message}`});
            return;
          }
          // publish changes
          SocketHelper.publishChanged(SocketHelper.EVENTNAME.SONGUPDATED, updatedSong);
          // return modified song
          resolve({success: true, updatedSong});
        });
      });
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