/**
 * ToDo:
 *  - update event
 *  - delete event
 */
module.exports = (Event, Song) => {
  /**
   * 
   */
  function getEvents () {
    return new Promise((resolve, reject) => {
      Event.find({}, (err, events) => {
        if (err) {
          reject({success: false, message: `Error in Events Route - GetEvents: ${err.message}`});
          return;
        }
        resolve({success: true, events});
      });
    });
  }

  /**
   * 
   */
  function getEvent (id) {
    return new Promise((resolve, reject) => {
      Event.findById(id, (err, event) => {
        if (err) {
          reject({success: false, message: `Error in Events Route - GetEvent: ${err.message}`});
          return;
        }
        resolve({success: true, event});
      });
    });
  }

  /**
   * 
   */
  function getEventSongs (id) {
    return new Promise((resolve, reject) => {
      Event.findById(id, (err, foundEvent) => {
        if (err) {
          reject({success: false, message: `Error in Events Route - GetEventSongs: Event: ${err.message}`});
          return;
        }

        let songIds = foundEvent.songs;
        
        Song.find({_id: { $in: songIds}}, (err, songs) => {
          if (err) {
            reject({success: false, message: `Error in Events Route - GetEventSongs: Songs: ${err.message}`});
            return;
          }
          resolve({success: true, songs});
        });
      });
    });
  }

  /**
   * 
   */
  function getEventSong (eid, sid) {
    return new Promise((resolve, reject) => {
      Event.findById(eid, (err, foundEvent) => {
        if (err) {
          reject({success: false, message: `Error in Events Route - GetEventSong: Event: ${err.message}`});
          return;
        }

        if (!foundEvent) {
          reject({success: false, message: "No Event was found!"});
          return;
        }

        Song.findById(sid, (err, song) => {
          if (err) {
            reject({success: false, message: `Error in Events Route - GetEventSong: Song: ${err.message}`});
            return;
          }
          resolve({success: true, song});
        });
      });
    });
  }

  /**
   * 
   */
  function createEvent (newEvent) {
    return new Promise((resolve, reject) => {
      Event.findOne(newEvent, (err, foundEvent) => {
        if (err) {
          reject({success: false, message: `Error in Events Route - CreateEvent: Find: ${err.message}`});
          return;
        }

        if (foundEvent) {
          reject({success: false, message: `Event is already added. Please add another one.`});
          return;
        }

        const createEvent = new Event({
          title: newEvent.title,
          location: newEvent.location,
          organizer: newEvent.organizer,
          eventDate: newEvent.eventDate
        });

        createEvent.save((err, createdEvent) => {
          if (err) {
            reject({success: false, message: `Error in Events Route - CreateEvent: Save: ${err.message}`});
            return;
          }
          resolve({success: true, createdEvent});
        });
      });
    });
  }
  
  /**
   * 
   */
  function createSong (eid, newSong) {
    return new Promise((resolve, reject) => {
      Event.findById(eid, (err, foundEvent) => {
        if (err) {
          reject({success: false, message: `Error in Events Route - CreateSong: Find: ${err.message}`});
          return;
        }

        if (!foundEvent) {
          reject({success: false, message: "No Event was found!"});
          return;
        }

        let createSong = new Song({
          artist: newSong.artist,
          title: newSong.title,
          eventId: foundEvent._id
        });

        createSong.save((err, createdSong) => {
          if (err) {
            reject({success: false, message: `Error in Events Route - CreateSong: Save Song: ${err.message}`});
            return;
          }
          
          foundEvent.songs.push(createdSong._id);

          foundEvent.save((err, savedEvent) => {
            if (err) {
              reject({success: false, message: `Error in Events Route - CreateSong: Save Event: ${err.message}`});
              return;
            }
            resolve({success: true, savedEvent, createdSong});
          });
        });
      });
    });
  }

  /**
   * 
   */
  return {
    getEvents: getEvents,
    getEvent: getEvent,
    getEventSongs: getEventSongs,
    getEventSong: getEventSong,
    createEvent: createEvent,
    createSong: createSong
  }
}