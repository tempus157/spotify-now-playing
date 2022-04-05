import { clientID, indexURI } from "$libs/env";
import type { RequestHandler } from "@sveltejs/kit";

type Output = {
  state: string;
};

export const get: RequestHandler<Record<string, string>, Output> = () => {
  const redirectURI = `${indexURI}/api/auth/redirect`;
  const scope = "user-read-currently-playing user-read-email";

  const url = new URL("https://accounts.spotify.com/authorize?");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientID);
  url.searchParams.set("redirect_uri", redirectURI);
  url.searchParams.set("scope", scope);

  return {
    status: 302,
    headers: {
      location: url.toString(),
    },
  };
};
