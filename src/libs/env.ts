import "dotenv/config";

function loadVariable(name: string) {
  const result = process.env[name];
  if (!result) {
    throw Error(`Environment variable ${name} does not exist.`);
  }
  return result;
}

export const cliendID = loadVariable("CLIENT_ID");
export const clientSecret = loadVariable("CLIENT_SECRET");
export const mongoURI = loadVariable("MONGO_URI");
