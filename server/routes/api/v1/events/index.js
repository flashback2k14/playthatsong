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

  events.get("/:eventid/songs", (req, res) => {});

  events.get("/:eventid/songs/:songid", (req, res) => {
    let eventId = req.params.eventid;
    let songId = req.params.songid;

    res.json({event: eventId, song: songId});
  });

  return events;
}