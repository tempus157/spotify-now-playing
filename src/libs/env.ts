import "dotenv/config";

function loadVariable(name: string) {
  const result = process.env[name];
  if (!result) {
    throw Error(`Environment variable ${name} does not exist.`);
  }
  return result;
}

export const clientID = loadVariable("CLIENT_ID");
export const clientSecret = loadVariable("CLIENT_SECRET");
export const indexURI = loadVariable("INDEX_URI");
export const mongoURI = loadVariable("MONGO_URI");
