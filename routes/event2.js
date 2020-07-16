const router = require("express").Router();
const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const _ = require("lodash");

const { Event } = require("../models/eventModel");

router.get("/", async (req, res) => {
  const events = await Event.find().select("title description isActive");
  res.send(events);
});
router.get("/:id", async (req, res) => {
  const eventId = req.params.id;
  if (!eventId) return res.status(400).send("No event id provided");

  const event = await Event.findById(eventId);

  if (!event) return res.status(400).send("Invalid event id");

  event.questions.forEach((q) => {
    // console.log(q["answer"]);
    // _.unset(q, "answer");
    // delete q.answer;
    // delete q["answer"];
    q["answer"] = undefined;
    // console.log(q["answer"]);
  });
  // console.log(event.questions);

  res.send(event);
});

router.post("/create", async (req, res) => {
  const { error } = validateEvent(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const event = new Event(req.body);
  await event.save();
  res.send(event);
});

router.post("/changeActive", async (req, res) => {
  const { error } = Joi.validate(req.body, {
    eventId: Joi.objectId().required(),
  });
  if (error) return res.status(400).send(error.details[0].message);
  const event = await Event.findById(req.body.eventId);
  if (!event) return res.status(400).send("Invalid event id");
  event.isActive = !event.isActive;
  await event.save();
  res.send(_.pick(event, ["_id", "isActive"]));
});

router.put("/:id", async (req, res) => {
  const eventId = req.params.id;
  if (!eventId) return res.status(400).send("No event id provided");

  const { error } = validateEvent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const event = await Event.findByIdAndUpdate(eventId, req.body, {
    useFindAndModify: false,
    new: true,
  });
  if (!event) return res.status(400).send("Invalid event id");

  // await event.save();
  res.send(event);
});

router.delete("/:id", async (req, res) => {
  const eventId = req.params.id;
  if (!eventId) return res.status(400).send("No event id provided");

  const event = await Event.findByIdAndDelete(eventId, {
    useFindAndModify: false,
  });
  if (!event) return res.status(400).send("Invalid event id");

  // await event.save();
  res.send(event);
});

router.post("/submit", async (req, res) => {
  const { error } = validateSubmitReq(req.body);
  // console.log("validated");
  if (error) return res.status(400).send(error.details[0].message);
  const { eventId, questionId, answer } = req.body;

  const event = await Event.findById(eventId);
  if (!event) return res.status(400).send("invalid event id");
  if (!event.isActive) return res.status(400).send("inactive event");
  const question = event.questions.id(questionId);
  // console.log(question);
  if (!question) return res.status(400).send("invalid question id");

  if (question.answer !== answer)
    return res.send({ correct: false, msg: "wrong answer" });
  //add points to user or team
  return res.send({ correct: true, msg: "correct answer" });
});

function validateEvent(req) {
  const quesSchema = {
    title: Joi.string().required(),
    type: Joi.string().valid("SINGLE", "MCQ", "CODE").required(),
    body: Joi.string().required(),
    file: Joi.string(),
    answer: Joi.string().required(),
    points: Joi.number().required(),
  };
  const schema = {
    title: Joi.string().required(),
    description: Joi.string().required(),
    questions: Joi.array().items(quesSchema).required(),
  };
  return Joi.validate(req, schema);
}

function validateSubmitReq(req) {
  const schema = {
    eventId: Joi.objectId().required(),
    questionId: Joi.objectId().required(),
    answer: Joi.string().required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
