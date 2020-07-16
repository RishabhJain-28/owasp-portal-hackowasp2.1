const express = require("express");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

// Models
const Event = require("../models/event");
const Team = require("../models/team");

const router = express.Router();

// Requests -->

// Get all events <
router.get("/all", async (req, res) => {
  try {
    const events = await Event.find().exec();

    if (!events) return res.status(400).send("No Events Found.");

    res.json(events);
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Get a particular event <
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).exec();

    if (!event) return res.status(400).send("No Event Found.");

    res.json(event);
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Create a new event <
router.post("/new", async (req, res) => {
  try {
    const event = await Event.create(req.body);

    res.json(event);
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Edit Details of event <
router.put("/edit/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();
    if (!event) return res.status(400).send("No Event Found.");

    res.json(event);
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Toggle Active Status <
router.put("/toggleActive/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { isActive: req.body.isActive },
      { new: true }
    ).exec();
    if (!event) return res.status(400).send("No Event Found.");

    res.json(event);
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// View Event ( Admin -> Teams and Questions )
router.get("/open/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).exec();
    const teams = await Team.find({ events: event._id }).exec();
    const questions = await Question.find({ forEvent: event._id }).exec();

    if (!event) return res.status(400).send("No Event Found.");
    if (!teams) return res.status(400).send("No Teams Found.");
    if (!questions) return res.status(400).send("No Questions Found.");

    res.json({
      event,
      teams,
      questions,
    });
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Delete the event
router.delete("/delete/:id", async (req, res) => {
  try {
    let event = await Event.findById(req.params.id).exec();
    if (!event) return res.status(400).send("No Event Found.");
    await event.remove();

    res.send("Event Deleted!");
  } catch (error) {
    console.log("Error occured in request \n", error);
    res.status(400).send("Error occured in request");
  }
});

// Requests end here -->

module.exports = router;
