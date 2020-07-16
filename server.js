const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");

//Config
const keys = require("./config/keys");
require("./config/passportConfig");

// Init app
const app = express();
app.use(express.json());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //1 day
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// Importing Routes
const team = require("./routes/team");
const event = require("./routes/event");
const question = require("./routes/question");
const timeline = require("./routes/timeline");
const user = require("./routes/user");
const admin = require("./routes/admin");

// Routes
app.use("/api/team", team);
app.use("/api/event", event);
app.use("/api/question", question);
app.use("/api/timeline", timeline);
app.use("/api/user", user);
app.use("/api/admin", admin);

// DB setup
mongoose
  .connect(
    "mongodb+srv://aryaman:aryaman@hackowasp.jk7hi.mongodb.net/hackowasp?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) =>
    console.error("Error occured while connecting to MongoDB\n", error)
  );

// Local DB setup
// mongoose
//   .connect("mongodb://localhost/hackowasp2_1", {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("Connected to MongoDB locally..."))
//   .catch((error) =>
//     console.error("Error occured while connecting to MongoDB\n", error)
//   );

// Port Setup

// const port = process.env.PORT || 5000;
const port = 5000; // added as 5000 for callbackURL on google dev // change after deployment
app.listen(port, () => console.log(`Server Started on port ${port}...`));
