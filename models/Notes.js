const mongoose = require("mongoose");

// schema here. db design here..//
const date = new Date().toLocaleTimeString();

const notesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: String,
    default: date,
  },
  description: {
    type: String,
    required: true,
  },
});

const note = mongoose.model("notes", notesSchema);

module.exports = note;
