import { clientID } from "$libs/env/private";
import { indexURI } from "$libs/env/public";
import type { RequestHandler } from "@sveltejs/kit";

type Output = {
  state: string;
};

export const get: RequestHandler<Record<string, string>, Output> = () => {
  const url = new URL("https://accounts.spotify.com/authorize?");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientID);
  url.searchParams.set("redirect_uri", `${indexURI}/api/auth/redirect`);
  url.searchParams.set("scope", "user-read-currently-playing user-read-email");

  return {
    status: 302,
    headers: {
      location: url.toString(),
    },
  };
};
