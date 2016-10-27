module.exports = (express, EventService, SongService) => {
  const events = express.Router();

  events.get("/", (req, res) => {
    EventService.getEvents()
      .then(data => res.json(data))
      .catch(error => res.status(400).json(error));
  });

  events.get("/:eventid", (req, res) => {
    let eventId = req.params.eventid;
    EventService.getEvent(eventId)
      .then(data => res.json(data))
      .catch(error => res.status(400).json(error));
  });

  events.get("/:eventid/songs", (req, res) => {
    let eventId = req.params.eventid;
    EventService.getEventSongs(eventId)
      .then(data => res.json(data))
      .catch(error => res.status(400).json(error));
  });

  events.get("/:eventid/songs/:songid", (req, res) => {
    let eventId = req.params.eventid;
    let songId = req.params.songid;
    EventService.getEventSong(eventId, songId)
      .then(data => res.json(data))
      .catch(error => res.status(400).json(error));
  });

  events.post("/", (req, res) => {
    let newEvent = {
      title: req.body.title,
      location: req.body.location,
      organizer: req.body.organizer,
      eventDate: req.body.eventDate
    };
    EventService.createEvent(newEvent)
      .then(data => res.status(201).json(data))
      .catch(error => res.status(400).json(error));
  });

  events.post("/:eventid/songs", (req, res) => {
    let eventId = req.params.eventid;
    let newSong = {
      artist: req.body.artist,
      title: req.body.title
    };
    EventService.createSong(eventId, newSong)
      .then(data => res.status(201).json(data))
      .catch(error => res.status(400).json(error));
  });

  events.put("/:eventid", (req, res) => {
    let eventId = req.params.eventid;
    let updatedEvent = {
      title: req.body.title,
      location: req.body.location,
      organizer: req.body.organizer,
      eventDate: req.body.eventDate,
      songs: req.body.songs,
      created: req.body.created
    };
    EventService.updateEvent(eventId, updatedEvent)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(400).json(error));
  });

  events.put("/:eventid/songs/:songid", (req, res) => {
    let eventId = req.params.eventid;
    let songId = req.params.songid;
    let updatedSong = {
      artist: req.body.artist,
      title: req.body.title,
      eventId: eventId,
      upvotes: req.body.upvotes,
      downvotes: req.body.downvotes,
      created: req.body.created
    };
    EventService.updateSong(eventId, songId, updatedSong)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(400).json(error));
  });

  events.delete("/:eventid/songs/:songid", (req, res) => {
    let eventId = req.params.eventid;
    let songId = req.params.songid;
    EventService.deleteSong(eventId, songId)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(400).json(error));
  });

  return events;
}