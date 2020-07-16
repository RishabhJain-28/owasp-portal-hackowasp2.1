const express = require("express");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

// NPM Packages
const CryptoJS = require("crypto-js");
const _ = require("lodash");

// Models
const Question = require("../models/question");
const Team = require("../models/team");
const Event = require("../models/event");

const router = express.Router();

// Requests -->

// View All Question for an event <
router.get("/eventQuestions/:id", async (req, res) => {
  try {
    const questions = await Question.find({ forEvent: req.params.id })
      .select("-answer")
      .exec();

    res.json(questions);
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// View a question <
router.get("/view/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .select("-answer")
      .exec();

    res.json(question);
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// View question with answer <
router.get("/viewAdmin/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).exec();
    const answer = CryptoJS.Rabbit.decrypt(
      question.answer,
      "this is weird secret key ;)"
    ).toString(CryptoJS.enc.Latin1);

    res.json({
      question,
      answer,
    });
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Create a new question <
router.post("/new", async (req, res) => {
  try {
    let question = new Question(req.body);
    question.answer = CryptoJS.Rabbit.encrypt(
      question.answer,
      "this is weird secret key ;)"
    );
    question = await question.save();

    res.json(question);
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Edit Question details <
router.put("/edit/:id", async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      _.pick(req.body, [
        "title",
        "statement",
        "type",
        "file",
        "points",
        "forEvent",
      ]),
      { new: true }
    ).exec();

    res.json(question);
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Change the answer <
router.put("/editAnswer/:id", async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      {
        answer: CryptoJS.Rabbit.encrypt(
          req.body.answer,
          "this is weird secret key ;)"
        ),
      },
      { new: true }
    ).exec();

    res.json(question);
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Delete a question
router.delete("/delete/:id", async (req, res) => {
  try {
    let question = await Question.findById(req.params.id).exec();
    await question.remove();

    res.send("Question Deleted!");
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Requests end here -->

module.exports = router;
