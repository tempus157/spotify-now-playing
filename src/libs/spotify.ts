import passport from "passport";
import { Strategy as SpotifyStrategy } from "passport-spotify";
import { clientID, clientSecret, indexURI } from "$libs/env";
import { connectMongoose, UserModel } from "./mongoose";

const spotifyStrategy = new SpotifyStrategy(
  {
    clientID,
    clientSecret,
    callbackURL: `${indexURI}/api/auth/redirect`,
  },
  async (accessToken, refreshToken, _, profile, done) => {
    try {
      await connectMongoose();
      await UserModel.findOneAndUpdate(
        { spotifyID: profile.id },
        { accessToken, refreshToken },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).exec();
    } catch (error) {
      done(error);
    }
  }
);

passport.use(spotifyStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

export { passport as spotifyPassport };
