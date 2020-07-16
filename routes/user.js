const router = require("express").Router();
const passport = require("passport");

//Login user
router.get(
  "/login",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

//Get currently logged in user
router.get("/me", async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.redirect("/api/user/login");
  }
  res.json(req.user);
});

//Logout user
router.get("/logout", (req, res) => {
  req.logout();
  // res.redirect("/api/user/login");
  // res.send("logged out");
  res.redirect("http://localhost:3000/");
});

//Callback for auth
router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    // res.json(req.user);
    res.redirect("http://localhost:3000/");
  }
);

module.exports = router;
