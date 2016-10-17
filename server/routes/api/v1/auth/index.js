module.exports = (express, AuthService) => {
  const auth = express.Router();

  auth.post("/login", (req, res) => {
    AuthService.login(req.body.name, req.body.password)
      .then(data => res.json(data))
      .catch(error => res.status(403).json(error));
  });

  auth.post("/register", (req, res) => {
    AuthService.register(req.body.name, req.body.password)
      .then(data => res.json(data))
      .catch(error => res.status(400).json(error));
  });

  return auth;
}