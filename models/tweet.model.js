const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    body: {type: String, required: true, maxlength: 140},
    tags: [String],
    user_id: {type: String}
})

const Tweet = mongoose.model("Tweet", tweetSchema, "tweets")

module.exports = Tweet