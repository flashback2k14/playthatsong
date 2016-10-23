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
    EventService.create(newEvent)
      .then(data => res.status(201).json(data))
      .catch(error => res.status(400).json(error));
  });

  return events;
}