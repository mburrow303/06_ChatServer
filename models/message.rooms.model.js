const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  messages: {
    type: Array,
  },
  ownerId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Room", RoomSchema);
