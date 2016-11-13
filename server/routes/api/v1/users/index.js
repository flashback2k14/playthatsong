module.exports = (express, UserService) => {
  const users = express.Router();

  users.get("/", (req, res) => {
    let flag = req.query.flag;
    UserService.getUsers(flag)
      .then(data => res.json(data))
      .catch(error => res.status(400).json(error));
  });

  users.get("/:id", (req, res) => {
    let userId = req.params.id;
    UserService.getUser(userId)
      .then(data => res.json(data))
      .catch(error => res.status(400).json(error));
  });

  return users;
}