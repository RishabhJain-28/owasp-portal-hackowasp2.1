const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");

const User = require("../models/user");

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/api/user/auth/google/callback",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    async (_1, _2, profile, done) => {
      console.log(profile);
      let user = await User.findOne({ googleId: profile.id });
      if (user) {
        done(null, user);
        return;
      }
      user = new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,

        permission: "USER",
      });
      await user.save();
      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
