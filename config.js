module.exports = {
  secret: process.env.SECRET || "'*!?play1that2song2?!*'",
  pwSecret: process.env.PWSECRET || "34585tjkdfb4iuo538tuguhjfnd8435oiptkjg",
  database: process.env.DB || "mongodb://127.0.0.1:27017/playthatsong",
  port: process.env.PORT || "5005"
};