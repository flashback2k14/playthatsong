/**
 * ToDo:
 *  - connect songs with event
 *    - events/:id/songs/:id
 */
module.exports = (Event) => {
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
  
  return {
    getEvents: getEvents,
    getEvent: getEvent
  }
}