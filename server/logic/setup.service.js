module.exports = (User, Event, Song) => {
  /**
   * delete all data
   */
  function _dropCollections () {
    return new Promise((resolve, reject) => {
      let dropProm = [];
      dropProm.push(User.remove({}));
      dropProm.push(Song.remove({}));
      dropProm.push(Event.remove({}));
      Promise.all(dropProm)
        .then(() => resolve({message: "All Data dropped!"}))
        .catch(error => reject(error.message));
    });
  }

  /**
   * create users
   */
  function _createUsers () {
    return new Promise((resolve, reject) => {
      // johnDoeSuperCool = U2FsdGVkX19UkPgHwL32N7fTdPbl20QLoI6F6AG1W7tSIsIc1I9VcaA7uoGuHyn3
      let user1 = new User({
        "name": "John Doe",
        "password": "U2FsdGVkX19UkPgHwL32N7fTdPbl20QLoI6F6AG1W7tSIsIc1I9VcaA7uoGuHyn3",
        "admin": true,
        "deejay": false
      });
      // hansPeterEvenCooler = U2FsdGVkX19AhgTSLKpkB21AxJUVruVW23OTzjwyHwhyiZ6m91LNUnzd1vHh39+L
      let user2 = new User({
        "name": "Hans Peter",
        "password": "U2FsdGVkX19AhgTSLKpkB21AxJUVruVW23OTzjwyHwhyiZ6m91LNUnzd1vHh39",
        "admin": false,
        "deejay": false
      });
      // yeahyeahyeah = U2FsdGVkX19Tto4ZZxG7XKUs5c3A90kPEbkvAKWrRd8=
      let user3 = new User({
        "name": "flashback",
        "password": "U2FsdGVkX19Tto4ZZxG7XKUs5c3A90kPEbkvAKWrRd8=",
        "admin": false,
        "deejay": true
      });

      let userProm = [];

      userProm.push(user1.save());
      userProm.push(user2.save());
      userProm.push(user3.save());

      Promise.all(userProm)
        .then(() => resolve({message: "All Users created!"}))
        .catch(error => reject(error.message));
    });
  }

  /**
   * create event with 2 song refs
   */
  function _createEventOne () {
    return new Promise((resolve, reject) => {
      let event1 = new Event({
        title: "Event #1",
        location: "Location #1",
        organizer: "Organizer #1",
        eventDate: "2016.10.31"
      });

      event1.save((err, createdEvent) => {
        if (err) {
          reject({message: err.message});
          return;
        }

        let song1 = new Song({
          artist: "Haftbefehl",
          title: "Julius Cesar",
          eventId: createdEvent._id,
          upvotes: 34,
          downvotes: 10
        });

        let song2 = new Song({
          artist: "Haftbefehl",
          title: "Saudi Arabi Money Rich",
          eventId: createdEvent._id,
          upvotes: 50,
          downvotes: 25
        });

        let songIds = [];
        let songsProm = [];

        songsProm.push(song1.save());
        songsProm.push(song2.save());

        Promise.all(songsProm)
          .then(data => {
            let s1Id = data[0]._id;
            let s2Id = data[1]._id;
            songIds.push(s1Id);
            songIds.push(s2Id);
            createdEvent.songs = songIds;

            createdEvent.save((err, finalEvent) => {
              if (err) {
                reject({message: err.message});
                return;
              }
              resolve({message: "Event #1 ready to rock!"});
            });
          })
          .catch(error => reject(error.message));
      });
    });
  }
  
  /**
   * create event with 1 song ref
   */
  function _createEventTwo () {
    return new Promise((resolve, reject) => {
      let event2 = new Event({
        title: "Event #2",
        location: "Location #2",
        organizer: "Organizer #2",
        eventDate: "2016.11.30"
      });

      event2.save((err, createdEvent) => {
        if (err) {
          reject({message: err.message});
          return;
        }

        let song1 = new Song({
          artist: "Haftbefehl",
          title: "CopKKKilla",
          eventId: createdEvent._id,
          upvotes: 0,
          downvotes: 12
        });

        let songIds = [];
        let songsProm = [];
        
        songsProm.push(song1.save());

        Promise.all(songsProm)
          .then(data => {
            let s1Id = data[0]._id;
            songIds.push(s1Id);
            createdEvent.songs = songIds;

            createdEvent.save((err, finalEvent) => {
              if (err) {
                reject({message: err.message});
                return;
              }
              resolve({message: "Event #2 ready to rock!"});
            });
          })
          .catch(error => reject(error.message))
      });
    });
  }

  /**
   * create event with 0 song refs
   */
  function _createEventThree () {
    return new Promise((resolve, reject) => {
      let event3 = new Event({
        title: "Event #3",
        location: "Location #3",
        organizer: "Organizer #3",
        eventDate: "2016.12.31"
      });

      event3.save((err, finalEvent) => {
        if (err) {
          reject({message: err.message});
          return;
        }
        resolve({message: "Event #3 ready to rock!"});
      });
    });
  }

  /**
   * public method
   */
  function createDemoData () {    
    return new Promise((resolve, reject) => {
      // drop data
      _dropCollections()
        .then((message) => {
          // create promise holder
          let promHolder = [];
          // create users
          promHolder.push(_createUsers());
          // create event #1
          promHolder.push(_createEventOne());
          // create event #2
          promHolder.push(_createEventTwo());
          // create event #3
          promHolder.push(_createEventThree());
          // finish if all promises resolved!
          Promise.all(promHolder)
            .then((messages) => { 
              let msgs = [];
              // drop message
              msgs.push(message.message);
              // event creation messages
              for (let msg of messages) {
                msgs.push(msg.message); 
              }
              // finish message
              msgs.push("Demo Data is ready!");
              resolve({message: msgs}); 
            });
        })
        .catch(error => reject(error.message));
    });
  }

  /**
   * 
   */
  return {
    createDemoData: createDemoData
  }
}