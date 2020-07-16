const PERMISSIONS = require("../config/permissions");

module.exports = (permission = "USER") => {
  return (req, res, next) => {
    if (!req.user) return res.status(400).send("Not logged in");
    if (
      PERMISSIONS.indexOf(req.user.permission) < PERMISSIONS.indexOf(permission)
    )
      return res.status(403).send("Not allowed");
    next();
  };
};
