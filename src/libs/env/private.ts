import "dotenv/config";
import { envError } from "./error";

function load(name: string) {
  return process.env[name] ?? envError(name);
}

export const clientID = load("CLIENT_ID");
export const clientSecret = load("CLIENT_SECRET");
export const mongoURI = load("MONGO_URI");
