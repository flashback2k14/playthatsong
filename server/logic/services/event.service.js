module.exports = (Event, Song, SocketHelper) => {
  /**
   * return all avialable events
   * @param deejayId {String}
   * @returns {Promise}
   */
  function getEvents (deejayId) {
    return new Promise((resolve, reject) => {
      // init query
      let query = {};
      // add deejayId to query if provided
      if (deejayId) {
        query = { deejayId: deejayId };
      }
      // find all events from query
      Event.find(query, (err, events) => {
        // check if some errors occurred
        if (err) {
          reject({success: false, message: `Error in Events Route - GetEvents: ${err.message}`});
          return;
        }
        // return found events
        resolve({success: true, events});
      });
    });
  }

  /**
   * return specific event by id
   * @param id {String}
   * @returns {Promise}
   */
  function getEvent (id) {
    return new Promise((resolve, reject) => {
      // find event by id
      Event.findById(id, (err, event) => {
        // check if some errors occurred
        if (err) {
          reject({success: false, message: `Error in Events Route - GetEvent: ${err.message}`});
          return;
        }
        // return found event
        resolve({success: true, event});
      });
    });
  }

  /**
   * return all songs from specific event
   * @param id {String}
   * @returns {Promise}
   */
  function getEventSongs (id) {
    return new Promise((resolve, reject) => {
      // find specific event by id
      Event.findById(id, (err, foundEvent) => {
        // error handling
        if (err) {
          reject({success: false, message: `Error in Events Route - GetEventSongs: Event: ${err.message}`});
          return;
        }
        // get song ids from event
        let songIds = foundEvent.songs;
        // find all songs from songs array 
        Song.find({_id: { $in: songIds}}, (err, songs) => {
          // error handling
          if (err) {
            reject({success: false, message: `Error in Events Route - GetEventSongs: Songs: ${err.message}`});
            return;
          }
          // return all songs
          resolve({success: true, songs});
        });
      });
    });
  }

  /**
   * get one specific song from one specific event
   * @param eid {String}
   * @param sid {String}
   * @returns {Promise}
   */
  function getEventSong (eid, sid) {
    return new Promise((resolve, reject) => {
      // find specific event by id
      Event.findById(eid, (err, foundEvent) => {
        // error handling
        if (err) {
          reject({success: false, message: `Error in Events Route - GetEventSong: Event: ${err.message}`});
          return;
        }
        // check if event is available
        if (!foundEvent) {
          reject({success: false, message: "No Event was found!"});
          return;
        }
        // find specific song by id
        Song.findById(sid, (err, song) => {
          // error handling
          if (err) {
            reject({success: false, message: `Error in Events Route - GetEventSong: Song: ${err.message}`});
            return;
          }
          // return the song
          resolve({success: true, song});
        });
      });
    });
  }

  /**
   * create new event
   * @param newEvent {Event}
   * @returns {Promise}
   */
  function createEvent (newEvent) {
    return new Promise((resolve, reject) => {
      // find specific event by event object
      Event.findOne(newEvent, (err, foundEvent) => {
        // error handling
        if (err) {
          reject({success: false, message: `Error in Events Route - CreateEvent: Find: ${err.message}`});
          return;
        }
        // check if event is already created
        if (foundEvent) {
          reject({success: false, message: `Event is already added. Please add another one.`});
          return;
        }
        // create new Event object
        const createEvent = new Event({
          deejayId: newEvent.deejayId,
          title: newEvent.title,
          location: newEvent.location,
          organizer: newEvent.organizer,
          eventDate: newEvent.eventDate
        });
        // save new evnet
        createEvent.save((err, createdEvent) => {
          // error handling
          if (err) {
            reject({success: false, message: `Error in Events Route - CreateEvent: Save: ${err.message}`});
            return;
          }
          // publish changes
          SocketHelper.publishChanges(SocketHelper.EVENTNAME.EVENTADDED, createdEvent);
          // return created event
          resolve({success: true, createdEvent});
        });
      });
    });
  }
  
  /**
   * create new song inside an event
   * @param eid {String}
   * @param newSong {Song}
   * @returns {Promise}
   */
  function createSong (eid, newSong) {
    return new Promise((resolve, reject) => {
      // find specific event by id
      Event.findById(eid, (err, foundEvent) => {
        // error handling
        if (err) {
          reject({success: false, message: `Error in Events Route - CreateSong: Find: ${err.message}`});
          return;
        }
        // check if event is available
        if (!foundEvent) {
          reject({success: false, message: "No Event was found!"});
          return;
        }
        // create new song object
        let createSong = new Song({
          artist: newSong.artist,
          title: newSong.title,
          eventId: foundEvent._id
        });
        // save new song
        createSong.save((err, createdSong) => {
          // error handling
          if (err) {
            reject({success: false, message: `Error in Events Route - CreateSong: Save Song: ${err.message}`});
            return;
          }
          // add new created song id to events song array
          foundEvent.songs.push(createdSong._id);
          // save found event
          foundEvent.save((err, updatedEvent) => {
            // error handling
            if (err) {
              reject({success: false, message: `Error in Events Route - CreateSong: Save Event: ${err.message}`});
              return;
            }
            // publish changes
            SocketHelper.publishChanges(SocketHelper.EVENTNAME.EVENTUPDATED, updatedEvent);
            SocketHelper.publishChanges(SocketHelper.EVENTNAME.SONGADDED, createdSong);
            // return event and song
            resolve({success: true, updatedEvent, createdSong});
          });
        });
      });
    });
  }

  /**
   * update specific event
   * @param eid {String}
   * @param updEvent {Event}
   * @returns {Promise}
   */
  function updateEvent (eid, updEvent) {
    return new Promise((resolve, reject) => {
      // find specific event from id
      Event.findById(eid, (err, foundEvent) => {
        // error handling
        if (err) {
          reject({success: false, message: `Error in Events Route - UpdateEvent: Find: ${err.message}`});
          return;
        }
        // check if event is available
        if (!foundEvent) {
          reject({success: false, message: "No Event was found!"});
          return;
        }
        // find and update event by id
        Event.findByIdAndUpdate(eid, updEvent, {new: true}, (err, updatedEvent) => {
          // error handling
          if (err) {
            reject({success: false, message: `Error in Events Route - UpdateEvent: Save: ${err.message}`});
            return;
          }
          // publish changes
          SocketHelper.publishChanges(SocketHelper.EVENTNAME.EVENTUPDATED, updatedEvent);
          // return modified song
          resolve({success: true, updatedEvent});
        });
      });
    });
  }

  /**
   * update specific song inside an event
   * @param eid {String}
   * @param sid {String}
   * @param updSong {Song}
   * @returns {Promise}
   */
  function updateSong (eid, sid, updSong) {
    return new Promise((resolve, reject) => {
      // find specific event from id
      Event.findById(eid, (err, foundEvent) => {
        // error handling
        if (err) {
          reject({success: false, message: `Error in Events Route - UpdateSong: Find: ${err.message}`});
          return;
        }
        // check if event is available
        if (!foundEvent) {
          reject({success: false, message: "No Event was found!"});
          return;
        }
        // find and update song by id
        Song.findByIdAndUpdate(sid, updSong, {new: true}, (err, updatedSong) => {
          // error handling
          if (err) {
            reject({success: false, message: `Error in Events Route - UpdateSong: Save: ${err.message}`});
            return;
          }
          // publish changes
          SocketHelper.publishChanges(SocketHelper.EVENTNAME.SONGUPDATED, updatedSong);
          // return modified song
          resolve({success: true, updatedSong});
        });
      });
    });
  }

  /**
   * delete specific song inside an event
   * @param eid {String}
   * @param sid {String}
   * @returns {Promise}
   */
  function deleteSong (eid, sid) {
    return new Promise((resolve, reject) => {
      // find specific event from id
      Event.findById(eid, (err, foundEvent) => {
        // error handling
        if (err) {
          reject({success: false, message: `Error in Events Route - DeleteSong: Find: ${err.message}`});
          return;
        }
        // check if event is available
        if (!foundEvent) {
          reject({success: false, message: "No Event was found!"});
          return;
        }
        // find and delete song by id
        Song.findByIdAndRemove(sid, (err, removedSong) => {
          // error handling
          if (err) {
            reject({success: false, message: `Error in Events Route - DeleteSong: Remove: ${err.message}`});
            return;
          }
          // get song ids from event
          let songIds = foundEvent.songs;
          // remove song id from songs array
          foundEvent.songs = songIds.filter(el => el !== sid);
          // save modified event
          foundEvent.save((err, updatedEvent) => {
            // error handling
            if (err) {
              reject({success: false, message: `Error in Events Route - DeleteSong: Save: ${err.message}`});
              return;
            }
            // publish changes
            SocketHelper.publishChanges(SocketHelper.EVENTNAME.EVENTUPDATED, updatedEvent);
            SocketHelper.publishChanges(SocketHelper.EVENTNAME.SONGDELETED, removedSong);
            // return modified event
            resolve({success: true, updatedEvent});
          });
        });
      });
    });
  }

  /**
   * public methods
   */
  return {
    getEvents: getEvents,
    getEvent: getEvent,
    getEventSongs: getEventSongs,
    getEventSong: getEventSong,
    createEvent: createEvent,
    createSong: createSong,
    updateEvent: updateEvent,
    updateSong: updateSong,
    deleteSong: deleteSong
  }
}