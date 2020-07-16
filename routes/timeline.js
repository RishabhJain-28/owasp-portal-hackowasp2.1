const router = require("express").Router();
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const { Timeline, TimelineNode } = require("../models/timeline");
const isAllowed = require("../middlewares/isAllowed");

//only allow members
// router.use(isAllowed("MEMBER"));

//Get all timelines
router.get("/", async (req, res) => {
  const timelines = await Timeline.find(); //.select("title description");
  res.json(timelines);
});

//Get a particular timeline
router.get("/:id", async (req, res) => {
  const timelineId = req.params.id;
  if (!timelineId) return res.status(400).send("No timeline id");
  const timeline = await Timeline.findById(timelineId);
  if (!timeline) return res.status(400).send("No timeline with the given id");
  res.json(timeline);
});

//Create a new timeline
router.post("/create", async (req, res) => {
  const { error } = validateCreateTimeline(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const timeline = new Timeline(req.body);

  const now = new Date(Date.now());

  // if (timeline.start < now || timeline.end < now)
  //   return res.status(400).send("invalid start or end date");
  if (timeline.start > timeline.end)
    return res.status(400).send("start cannot be more than end");

  await timeline.save();
  res.json(timeline);
});

//Create a new node in a timeline
router.post("/node/create/:id", async (req, res) => {
  //end shoud be greatter
  const timelineId = req.params.id;
  console.log(timelineId);
  if (!timelineId) return res.status(400).send("No timeline id");

  const { error } = validateCreateNode(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const timeline = await Timeline.findById(timelineId);
  if (!timeline) return res.status(400).send("No timeline with the given id");
  const newTimeLineNode = new TimelineNode(req.body);

  console.log(timeline);
  if (newTimeLineNode.end > timeline.end)
    return res.status(400).send("node cannot end after timeline");
  // console.log(timeline.nodes[-1]);
  const n = timeline.nodes.length;
  if (n && newTimeLineNode.end < timeline.nodes[n - 1].end)
    return res.status(400).send("node cannot end before last node");

  timeline.nodes.push(newTimeLineNode);

  timeline.done = false;
  await timeline.save();
  res.json(newTimeLineNode);
});

//Delete a timeline
router.delete("/:id", async (req, res) => {
  const timelineId = req.params.id;
  if (!timelineId) return res.status(400).send("No timeline id");
  const timeline = await Timeline.findByIdAndDelete(timelineId);
  if (!timeline) return res.status(400).send("No timeline with the given id");
  res.json(timeline);
});

//Delete a node from a timeline
router.delete("/node/:timelineId&:nodeId", async (req, res) => {
  const { timelineId, nodeId } = req.params;

  if (!nodeId) return res.status(400).send("No node id");
  if (!timelineId) return res.status(400).send("No timeline id");

  const timeline = await Timeline.findById(timelineId);
  if (!timeline) return res.status(400).send("No timeline with the given id");

  const node = timeline.nodes.id(nodeId);
  if (!node) return res.status(400).send("No node with the given id");

  node.remove();
  timeline.save();
  res.json(node);
});

//Edit a node
// router.put("/node/:timelineId&:nodeId", async (req, res) => {
//   const { timelineId, nodeId } = req.params;
//   console.log(timelineId);
//   console.log(nodeId);
//   if (!nodeId) return res.status(400).send("No node id");
//   if (!timelineId) return res.status(400).send("No timeline id");

//   const timeline = await Timeline.findById(timelineId);
//   if (!timeline) return res.status(400).send("No timeline with the given id");

//   const node = timeline.nodes.id(nodeId);
//   console.log(node);

//   if (!node) return res.status(400).send("No node with the given id");

//   node. = true;
//   await timeline.save();
//   res.json(timeline);

//   await timeline.save();
//   res.json(timeline);
// });

//Edit timeline
router.put("/:id", async (req, res) => {
  const timelineId = req.params.id;
  if (!timelineId) return res.status(400).send("No timeline id");

  const { error } = validateCreateTimeline(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const timeline = await Timeline.findByIdAndUpdate(timelineId, req.body, {
    useFindAndModify: false,
    new: true,
  });

  if (!timeline) return res.status(400).send("No timeline with the given id");
  res.json(timeline);
});

router.get("/done/:id", async (req, res) => {
  const timelineId = req.params.id;
  if (!timelineId) return res.status(400).send("No timeline id");
  const timeline = await Timeline.findById(timelineId);
  if (!timeline) return res.status(400).send("No timeline with the given id");
  timeline.done = true;
  timeline.nodes.forEach((n) => (n.done = true));
  await timeline.save();
  res.json(timeline);
});
router.get("/node/done/:id&:nodeId", async (req, res) => {
  const timelineId = req.params.id;
  const nodeId = req.params.nodeId;
  console.log(nodeId);
  console.log(timelineId);
  if (!timelineId) return res.status(400).send("No timeline id");
  if (!nodeId) return res.status(400).send("No node Id ");
  const timeline = await Timeline.findById(timelineId);
  if (!timeline) return res.status(400).send("No timeline with the given id");

  const node = timeline.nodes.id(nodeId);
  console.log(node);

  if (!node) return res.status(400).send("No node with the given id");

  node.done = true;
  await timeline.save();
  res.json(timeline);
});

function validateCreateTimeline(req) {
  const schema = {
    title: Joi.string().required(),
    description: Joi.string().required(),
    start: Joi.date(),
    end: Joi.date().required(),
    nodes: Joi.array(),
    users: Joi.array().items(Joi.objectId()).required(),
    done: Joi.boolean(),
  };
  return Joi.validate(req, schema);
}
function validateCreateNode(req) {
  const nodeSchema = {
    title: Joi.string().required(),
    description: Joi.string().required(),
    end: Joi.date().required(),
    users: Joi.array().items(Joi.objectId()).required(),
    done: Joi.boolean(),
  };
  return Joi.validate(req, nodeSchema);
}

module.exports = router;
