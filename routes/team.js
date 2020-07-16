const express = require("express");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

// NPM Packages
const CryptoJS = require("crypto-js");
const _ = require("lodash");
const shortid = require("shortid");

// Models
const Team = require("../models/team");
const Event = require("../models/event");
const Question = require("../models/question");

const router = express.Router();

// Requests -->

// Create a new team <
router.post("/new", async (req, res) => {
  try {
    const team = await Team.create({
      teamName: req.body.teamName,
      teamCode: shortid.generate().toString(),
      members: req.user._id,
    });

    team.populate("members", (err, doc) => {
      if (!err) {
        res.json(doc);
      }
    });
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Join Team
router.put("/join", async (req, res) => {
  try {
    const team = await Team.findOneAndUpdate(
      { teamCode: req.body.teamCode },
      { $push: { members: req.user._id } },
      { new: true }
    ).exec();

    team.populate("members events", (err, doc) => {
      if (!err) {
        res.json(team);
      }
    });
  } catch (error) {
    console.log("Error occured in request. \n", error);
    res.status(400).send("Error occured in request.");
  }
});

// Leave Team
router.put("/leave/:id", async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { members: req.user._id },
      },
      { new: true }
    ).exec();
    res.json(team);
  } catch (error) {
    console.log("Error occured in request. \n", error);
    res.status(400).send("Error occured in request.");
  }
});

// Edit team details <
router.put("/edit/:id", async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      {
        teamName: req.body.teamName,
      },
      { new: true }
    ).exec();

    res.json(team);
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Add a member to team
router.put("/addMember/:id", async (req, res) => {
  try {
    const member = await User.find({ email: req.body.email }).exec();
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      {
        $push: { members: member._id },
      },
      { new: true }
    ).exec();

    res.json(team);
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Remove a member from team
router.put("/removeMember/:id", async (req, res) => {
  try {
    const member = await User.find({ email: req.body.email }).exec();
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { members: member._id },
      },
      { new: true }
    ).exec();

    res.json(team);
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Toggle Access of team <
router.put("/toggleAccess/:id", async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      {
        access: req.body.access,
      },
      { new: true }
    ).exec();

    res.json(team);
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Add event to team ( Array ) <
router.put("/addEvents", async (req, res) => {
  try {
    const team = await Team.findOneAndUpdate(
      { members: req.user._id },
      {
        events: req.body.events,
      },
      { new: true }
    ).exec();

    res.json(team);
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Add event ( Object ) <
router.put("/addEvent", async (req, res) => {
  try {
    const team = await Team.findOneAndUpdate(
      { members: req.user._id },
      {
        $push: { events: req.body.eventId },
      },
      { new: true }
    ).exec();

    res.json(team);
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Remove event from team <
router.put("/removeEvent/:id", async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { events: req.body.event },
      },
      { new: true }
    ).exec();

    res.json(team);
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Assign question ( Array )
router.put("/addQuestions/:id", async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      {
        questionsAssigned: req.body.questions,
      },
      { new: true }
    ).exec();

    res.json(team);
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Assign question ( Object )
router.put("/addQuestion/:id", async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      {
        $push: { questionsAssigned: req.body.question },
      },
      { new: true }
    ).exec();

    res.json(team);
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Remove question
router.put("/removeQuestion/:id", async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { questionsAssigned: req.body.question },
      },
      { new: true }
    ).exec();

    res.json(team);
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Submit Question
router.put("/submit/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).exec();
    let team = await Team.findOne({ members: req.user._id }).exec();

    // Update submittedAnswer in team
    let teamQuestion = _.find(team.questionsAssigned, {
      question: question._id,
    });

    // Update score of team
    const decryptedAnswer = CryptoJS.Rabbit.decrypt(
      question.answer,
      "this is weird secret key ;)"
    ).toString(CryptoJS.enc.Latin1);
    console.log(decryptedAnswer);

    if (
      req.body.submittedAnswer.trim() === decryptedAnswer &&
      teamQuestion.submittedAnswer !== decryptedAnswer
    ) {
      teamQuestion.submittedAnswer = req.body.submittedAnswer;
      team.score = team.score + question.points;
      team = await team.save();

      res.json({ message: "Correct Answer !", score: team.score });
    } else {
      teamQuestion.submittedAnswer = req.body.submittedAnswer;
      team = await team.save();
      res.json({ message: "Wrong Answer !", score: team.score });
    }
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Get My Teams
router.get("/me", async (req, res) => {
  try {
    const teams = await Team.find({ members: req.user._id })
      .populate("members events")
      .select("-questionsAssigned")
      .exec();

    res.json(teams);
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Team View from id ( Restricted ) <
router.get("/:id", async (req, res) => {
  try {
    const team = await Team.findOne({
      _id: req.params.id,
      members: req.user._id,
    })
      .populate("members events")
      .exec();

    res.json(team);
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Team view ( Admin )
router.get("/viewAdmin/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .sort("-")
      .populate("members events questionsAssigned.question")
      .exec();

    res.json(team);
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Team Login

// Team Logout

// Team view during event
router.get("/start/:id", async (req, res) => {
  try {
    const event = await Event.findOne({
      _id: req.params.id,
      isActive: true,
    }).exec();
    if (!event) return res.send("Event Does Not Exist");
    const team = await Team.findOne({
      members: req.user._id,
      events: event._id,
    })
      .populate("members events")
      .populate({
        path: "questionsAssigned.question",
        match: { forEvent: req.params.id },
        select: "-answer",
      })
      .exec();

    const eventTeams = await Team.find({ events: event._id }).exec();

    res.json({ team, event, eventTeams });
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Delete a team
router.delete("/delete/:id", async (req, res) => {
  try {
    let team = await findById(req.params.id).exec();
    await team.remove();
    res.send("Team deleted...");
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Requests end here -->

module.exports = router;
