module.exports = (express, AuthService) => {
  const auth = express.Router();

  auth.post("/login", (req, res) => {
    AuthService.login(req.body.name, req.body.password)
      .then(data => res.json(data))
      .catch(error => res.status(403).json(error));
  });

  auth.post("/register", (req, res) => {
    let username = req.body.name;
    let password = req.body.password;
    let flag = req.query.flag;
    AuthService.register(username, password, flag)
      .then(data => res.json(data))
      .catch(error => res.status(400).json(error));
  });

  return auth;
}