const express = require("express");
const Tweet = require("../models/tweet.model");
const router = express.Router();
const mongoose = require("mongoose");

// get by user id
router.get("/:user_id", async (req, res) => {
  // console.log(mongoose.Types.ObjectId(req.params.user_id))
  const tweetsCount = await Tweet.find({ user_id: req.params.user_id }).count();
  const allTweets = await Tweet.find({ user_id: req.params.user_id }).limit(10);
  if (allTweets.length === 0)
    return res.send({ data: [], msg: "No tweets found" });
  res.status(200).send({ allTweets, tweetsCount });
});

router.get("/", async (req, res) => {
  const allTweets = await Tweet.find({});
  res.render("tweets", { data: allTweets });
});

// add tweet
router.post("/create", async (req, res) => {
  const tweet = await Tweet.create({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    body: req.body.body,
    tags: req.body.tags,
    user_id: req.body.user_id,
  });
  res.status(201).send(tweet);
});
module.exports = router;
