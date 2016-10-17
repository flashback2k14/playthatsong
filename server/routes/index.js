module.exports = (express) => {
  const base = express.Router();

  base.get("/", (req, res) => {
    res.json({success: true, message: "Backend is ready to rock!"});
  });

  return base;
}