const mongoose = require("mongoose");
const { questionSchema } = require("./questionsModel");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: { type: [questionSchema], required: true },
  isActive: { type: Boolean, default: false },
});

const Event = mongoose.model("event", eventSchema);

module.exports.Event = Event;
