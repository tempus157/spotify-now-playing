import "dotenv/config";

function load(name: string) {
  const result = process.env[name];
  if (!result) {
    throw new Error(`Environment variable ${name} does not exist.`);
  }
  return result;
}

export const clientID = load("CLIENT_ID");
export const clientSecret = load("CLIENT_SECRET");
export const mongoURI = load("MONGO_URI");
