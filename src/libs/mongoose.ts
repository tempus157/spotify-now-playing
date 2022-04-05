import mongoose, { Document, Schema } from "mongoose";
import { mongoURI } from "$libs/env";

export interface UserDocument extends Document {
  spotifyID: string;
  accessToken: string;
  refreshToken: string;
  nameColor: string;
  artistColor: string;
  backgroundColor: string;
  cornerRounding: number;
}

let isConnected = false;

const schema = new Schema({
  spotifyID: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  nameColor: { type: String, required: true, default: "#8ab4f8" },
  artistColor: { type: String, required: true, default: "#ffffff" },
  backgroundColor: { type: String, required: true, default: "#20212464" },
  cornerRounding: { type: Number, required: true, default: 40 },
});

const UserModel =
  mongoose.models.User ?? mongoose.model<UserDocument>("User", schema);

export async function getUserModel() {
  if (!isConnected) {
    await mongoose.connect(mongoURI);
    isConnected = true;
  }
  return UserModel;
}
