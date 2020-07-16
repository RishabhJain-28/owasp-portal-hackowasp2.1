const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  statement: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["MCQ", "SINGLE", "CODE"],
    required: true,
  },
  options: {
    type: Array,
    default: [],
    min: 4,
    max: 4
  },
  file: {
    type: String,
  },
  answer: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  forEvent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
});

questionSchema.post("remove", async (doc, next) => {
  const Team = require("./team");
  await Team.update(
    { questionsAssigned: { $elemMatch: { question: doc._id } } },
    {
      $pull: { questionsAssigned: { question: doc._id } },
    },
    { multi: true }
  );

  next();
});

module.exports = mongoose.model("Question", questionSchema);
