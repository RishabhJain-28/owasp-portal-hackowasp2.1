const mongoose = require("mongoose");

const nodeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  end: { type: Date, required: true },
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
  },
  done: { type: Boolean, default: false },
});
const timelineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  start: { type: Date, default: Date.now() },
  end: { type: Date, required: true },
  nodes: { type: [nodeSchema], default: [] },
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
  },
  done: { type: Boolean, default: false },
});

const Timeline = mongoose.model("timeline", timelineSchema);
const TimelineNode = mongoose.model("node", nodeSchema);

module.exports.Timeline = Timeline;
module.exports.TimelineNode = TimelineNode;
