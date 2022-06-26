const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  FileName: {
    type: String,
    required: true,
  }
});

const Video = new mongoose.model('Video', videoSchema);

module.exports = Video;