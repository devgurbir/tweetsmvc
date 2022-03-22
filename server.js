const express = require("express");
const connect = require("./config/db");
const userRouter = require("./routes/user.routes");
const tweetController = require("./controller/tweet.controller");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/users", userRouter);
app.use("/tweets", tweetController);

const start = async () => {
  await connect();

  app.listen(5000, () => {
    console.log("Listening on port 5000");
  });
};

module.exports = start;
