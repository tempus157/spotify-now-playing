import type { RequestHandler } from "@sveltejs/kit";
import { clientID } from "$libs/config";

type Params = Record<string, string>;
type Output = {
  state: string;
};

export const get: RequestHandler<Params, Output> = ({ url }) => {
  const redirect = new URL("https://accounts.spotify.com/authorize?");
  redirect.searchParams.set("response_type", "code");
  redirect.searchParams.set("client_id", clientID);
  redirect.searchParams.set("redirect_uri", `${url.origin}/api/auth/redirect`);
  redirect.searchParams.set(
    "scope",
    "user-read-currently-playing user-read-email"
  );

  return {
    status: 302,
    headers: {
      location: redirect.toString(),
    },
  };
};
