const mongoose = require("mongoose");
const PERMISSIONS = require("../config/permissions");
const { boolean } = require("joi");
const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  permission: {
    type: String,
    enum: PERMISSIONS,
    required: true,
    default: "USER",
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    default: null,
  },
  emailToken: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
