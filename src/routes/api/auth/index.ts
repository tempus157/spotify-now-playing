import { clientID, indexURI } from "$libs/env";
import type { RequestHandler } from "@sveltejs/kit";

function generateRandomID(length: number) {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export const get: RequestHandler = () => {
  const redirectURI = `${indexURI}/api/auth/redirect`;
  const scope = "user-read-currently-playing user-read-email";
  const state = generateRandomID(16);

  const url = new URL("https://accounts.spotify.com/authorize?");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientID);
  url.searchParams.set("redirect_uri", redirectURI);
  url.searchParams.set("scope", scope);
  url.searchParams.set("state", state);

  return {
    status: 302,
    headers: { location: url.toString() },
  };
};
