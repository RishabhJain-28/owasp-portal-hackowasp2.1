const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  // eventId: {type: mongoose.Schema.Types.ObjectId, ref= 'event'},
  type: { type: String, enum: ["SINGLE", "MCQ", "CODE"], required: true },
  body: { type: String, required: true },
  file: { type: String },
  answer: { type: String, required: true },
  points: { type: Number, required: true },
});

const Question = mongoose.model("question", questionSchema);

module.exports.Question = Question;
module.exports.questionSchema = questionSchema;
