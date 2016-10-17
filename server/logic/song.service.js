/**
 * ToDo:
 *  - update song
 *  - delete song
 */
module.exports = (Song) => {
  /**
   * Return all Songs from DB
   * @returns songs {Promise}
   */
  function getSongs () {
    return new Promise ((resolve, reject) => {
      Song.find({}, (err, songs) => {
        if (err) {
          reject({success: false, message: `Error in Songs Route - getSongs: ${err.message}`});
          return;
        }
        resolve({success: true, songs});
      });
    });
  }

  /**
   * Return one specific Song from DB
   * @param id {Number} Song id
   * @returns song {Promise}
   */
  function getSong (id) {
    return new Promise ((resolve, reject) => {
      Song.findOne({_id: id}, (err, song) => {
        if (err) {
          reject({success: false, message: `Error in Songs Route - getSong: ${err.message}`});
          return;
        }
        resolve({success: true, song});
      });
    });
  }

  /**
   * 
   */
  function create (song) {
    return new Promise ((resolve, reject) => {
      Song.findOne(song, (err, foundSong) => {
        if (err) {
          reject({success: false, message: `Error in Songs Route - AddSong - Find: ${err.message}`});
          return;
        }

        if (foundSong) {
          reject({success: false, message: `Song is already added. Please add another one.`});
          return;
        }

        const newSong = new Song({
          artist: song.artist,
          title: song.title
        });

        newSong.save((err, createdSong) => {
          if (err) {
            reject({success: false, message: `Error in Songs Route - AddSong - Save: ${err.message}`});
            return;
          }
          resolve({success: true, createdSong});
        });
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
          reject({success: false, message: `Error in Songs Route - Upvote - Find by ID: ${err.message}`});
          return;
        }
        song.upvotes = song.upvotes + 1;
        song.save((err, updatedSong) => {
          if (err) {
            reject({success: false, message: `Error in Songs Route - Upvote - Save: ${err.message}`});
            return;
          }
          reject({success: true, updatedSong});
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
          reject({success: false, message: `Error in Songs Route - Downvote - Find by ID: ${err.message}`});
          return;
        }
        song.downvotes = song.downvotes + 1;
        song.save((err, updatedSong) => {
          if (err) {
            reject({success: false, message: `Error in Songs Route - Downvote - Save: ${err.message}`});
            return;
          }
          reject({success: true, updatedSong});
        });
      });
    });
  }

  return {
    getSongs: getSongs,
    getSong: getSong,
    create: create,
    upvote: upvote,
    downvote: downvote
  }
}