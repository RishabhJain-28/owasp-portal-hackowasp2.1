const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  eventDate: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

eventSchema.post("remove", async (doc, next) => {
  const Question = require("./question");

  await Question.remove({ for: doc._id });

  next();
});

module.exports = mongoose.model("Event", eventSchema);
