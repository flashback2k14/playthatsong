module.exports = (sio) => {

  const EVENTNAME = {
    DEEJAYADDED : "deejay_added",
    DEEJAYUPDATED : "deejay_updated",
    DEEJAYDELETED : "deejay_deleted",
    EVENTADDED : "event_added",
    EVENTUPDATED : "event_updated",
    EVENTDELETED : "event_deleted",
    SONGADDED : "song_added",
    SONGUPDATED : "song_updated",
    SONGDELETED : "song_deleted"
  };

  function publishChanges (eventName, changedObject) {
    sio.emit(eventName, changedObject);
  }

  return {
    EVENTNAME,
    publishChanges
  }
}