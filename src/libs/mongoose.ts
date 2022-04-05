import mongoose, { Document, Schema } from "mongoose";
import { mongoURI } from "$libs/env";

let isConnected = false;

export async function connectMongoose() {
  if (isConnected) {
    return;
  }
  await mongoose.connect(mongoURI);
  isConnected = true;
}

export interface UserDocument extends Document {
  spotifyID: string;
  accessToken: string;
  refreshToken: string;
  nameColor: string;
  artistColor: string;
  backgroundColor: string;
  cornerRounding: number;
}

const schema = new Schema({
  spotifyID: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  nameColor: { type: String, required: true, default: "#8ab4f8" },
  artistColor: { type: String, required: true, default: "#ffffff" },
  backgroundColor: { type: String, required: true, default: "#20212464" },
  cornerRounding: { type: Number, required: true, default: 40 },
});

export const UserModel =
  mongoose.models.User ?? mongoose.model<UserDocument>("User", schema);
