const router = require("express").Router();
const Joi = require("joi");

const transport = require("../config/mail");

const User = require("../models/user");

const isAllowed = require("../middlewares/isAllowed");

//Get all users
router.get("/all", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//Get all MEMBERS OR ABVOE
router.get("/all/members", async (req, res) => {
  const users = await User.find({
    permission: { $in: ["MEMBER", "CORE", "EXBO", "GENSEC"] },
  });
  res.json(users);
});

// Change permission of certain user
router.put("/permission/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      permission: req.body.permission,
    },
    {
      useFindAndModify: false,
      new: true,
    }
  );
  await user.save();
  res.json(user);
});

router.post("/invite", async (req, res) => {
  const { email } = req.body;
  if (!email) res.status(400).send("Email required");

  const mailOptions = {
    from: "youremail@gmail.com",
    to: email,
    subject: "Sending Email using Node.js",
    html: `<a href="http://localhost:5000/api/admin/accept/${email}">Accept</a>`,
  };

  transport.sendMail(mailOptions, async function (error, info) {
    if (error) {
      console.log(error);
      res.send("Email not Sent");
    } else {
      const user = await User.findOne({ email: req.body.email });

      if (!user) return res.send("no user found");

      user.emailToken = true;

      await user.save();
      res.send("Email Sent");
    }
  });
});

router.get("/accept/:email", async (req, res) => {
  const user = await User.findOne({ email: req.params.email });

  if (!user) return res.send("no user found");
  if (!user.emailToken) return res.send("not allowed");

  user.permission = "MEMBER";
  user.emailToken = false;

  await user.save();
  res.redirect("http://localhost:3000/");
});

module.exports = router;
