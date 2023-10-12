const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  date: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Message", MessageSchema);
