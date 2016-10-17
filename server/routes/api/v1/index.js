module.exports = (express) => {
  const base = express.Router();

  base.get("/", (req, res) => {
    res.json({success: true, message: "Play That Song API Version 1 is ready to rock!"});
  });

  return base;
}