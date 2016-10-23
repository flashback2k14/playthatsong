module.exports = (express, SetupService) => {
  const setup = express.Router();

  setup.get("/", (req, res) => {
    SetupService.createDemoData()
      .then(data => res.json(data))
      .catch(error => res.status(400).json(error));
  });

  return setup;
}