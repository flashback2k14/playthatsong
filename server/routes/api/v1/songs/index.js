module.exports = (express, SongService) => {
  const songs = express.Router();

  songs.get("/", (req, res) => {
    SongService.getSongs()
      .then(data => res.json(data))
      .catch(error => res.status(400).json(error));
  });

  songs.get("/:id", (req, res) => {
    let songId = req.params.id;
    SongService.getSong(songId)
      .then(data => res.json(data))
      .catch(error => res.status(400).json(error));
  });

  songs.patch("/:id/upvote", (req, res) => {
    let songId = req.params.id;
    let userId = req.body.userid;
    SongService.upvote(songId, userId)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(400).json(error));
  });

  songs.patch("/:id/downvote", (req, res) => {
    let songId = req.params.id;
    let userId = req.body.userid;
    SongService.downvote(songId, userId)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(400).json(error));
  });

  return songs;
}