const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const Modelo = require("./models/index");
const bcrypt = require("bcryptjs");

module.exports = {
  ////
  authenticateFB: () => {
    passport.use(
      new FacebookStrategy(
        {
          clientID: process.env.FACEBOOK_APP_ID,
          clientSecret: process.env.FACEBOOK_APP_SECRET,
          callbackURL: "http://localhost:3000/auth/facebook/callback",
          //passReqToCallback: true,
          profileFields: ["id", "email", "name"],
        },
        function (accessToken, refreshToken, profile, done) {
          console.log(profile);
          Modelo.User.findOrCreate({
            where: { email: profile.emails[0].value },
            defaults: {
              nombre: profile.name.givenName,
              apellido: profile.name.familyName,
              email: profile.emails[0].value,
              password: profile.id,
              user: "root",
            },
          }).then(function (user, created) {
            done(null, user);
          });
        }
      )
    );
  },

  /////
  authenticate: () => {
    passport.use(
      new LocalStrategy((username, password, done) => {
        ///Busco username y password en db

        Modelo.User.findAll({
          limit: 1,
          where: {
            user: username,
          },
        }).then((user) => {
          if (user.length >= 1) {
            if (
              username === user[0].dataValues.user &&
              bcrypt.compareSync(password, user[0].dataValues.password)
            ) {
              return done(null, user);
            }
          } else {
            done(null, false);
          }
        });
      })
    );

    passport.serializeUser(function (user, done) {
      done(null, user);
    });

    passport.deserializeUser(function (user, done) {
      done(null, user);
    });
  },
};
