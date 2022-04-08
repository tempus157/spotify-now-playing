import mongoose, { Schema } from "mongoose";
import { mongoURI } from "./env/private";

export interface User {
  spotifyID: string;
  tokenExpiration: number;
  accessToken: string;
  refreshToken: string;
  nameColor: string;
  artistColor: string;
  backgroundColor: string;
  backgroundOpacity: number;
  cornerRounding: number;
}

const schema = new Schema<User>({
  spotifyID: { type: String, required: true, unique: true },
  tokenExpiration: { type: Number, required: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  nameColor: { type: String, required: true, default: "#8ab4f8" },
  artistColor: { type: String, required: true, default: "#ffffff" },
  backgroundColor: { type: String, required: true, default: "#202124" },
  backgroundOpacity: { type: Number, required: true, default: 50 },
  cornerRounding: { type: Number, required: true, default: 50 },
});

let isConnected = false;

export async function getUserModel() {
  if (!isConnected) {
    await mongoose.connect(mongoURI);
    isConnected = true;
  }

  return mongoose.models.User
    ? mongoose.model<User>("User")
    : mongoose.model<User>("User", schema);
}
