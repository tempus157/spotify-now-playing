import "dotenv/config";

function throwError(name: string): never {
  throw Error(`Environment variable ${name} does not exist.`);
}

function loadVariable(name: string) {
  const result = process.env[name];
  return result ?? throwError(name);
}

export const clientID = loadVariable("CLIENT_ID");
export const clientSecret = loadVariable("CLIENT_SECRET");
export const mongoURI = loadVariable("MONGO_URI");

export const indexURI =
  import.meta.env.VITE_INDEX_URI ?? throwError("VITE_INDEX_URI");
