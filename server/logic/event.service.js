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
      Event.find({_id: id}, (err, event) => {
        if (err) {
          reject({success: false, message: `Error in Events Route - GetEvent: ${err.message}`});
          return;
        }
        resolve({success: true, event});
      });
    });
  }

  function create () {
    return new Promise((resolve, reject) => {
      let event1 = new Event({
        title: "Event #4",
        location: "Location #4",
        organizer: "Organizer #4",
        eventDate: "2016.02.31"
      });
    
      let song1 = new Song({
        artist: "Haftbefehl",
        title: "Julius Cesar",
        upvotes: 34,
        downvotes: 10
      });

      event1.songs.push(song1);     

      event1.save((err, ev) => {
        if (err) {
          reject({message: err.message});
          return;
        }
        resolve({ev});
      });
    });
  }
  
  return {
    getEvents: getEvents,
    getEvent: getEvent,
    create: create
  }
}