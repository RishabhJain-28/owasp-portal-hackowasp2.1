const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  teamCode: {
    type: String,
    unique: true,
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  questionsAssigned: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
      submittedAnswer: {
        type: String,
        default: null,
      },
    },
  ],
  access: {
    type: Boolean,
    default: false,
  },
  score: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Team", teamSchema);
