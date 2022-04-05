import { clientID, clientSecret, indexURI } from "$libs/env";
import { connectMongoose, UserModel } from "$libs/mongoose";
import type { RequestHandler } from "@sveltejs/kit";

type Output = {
  accessToken: string;
  refreshToken: string;
};

export const get: RequestHandler<Record<string, string>, Output> = async ({
  url,
}) => {
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!state) {
    console.log(code);
    return {
      status: 302,
      headers: { location: "http://localhost:3000" },
    };
  }

  const headers = {
    Authorization: `Basic ${Buffer.from(`${clientID}:${clientSecret}`).toString(
      "base64"
    )}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const body = new URLSearchParams();
  body.set("grant_type", "authorization_code");
  body.set("code", code);
  body.set("redirect_uri", `${indexURI}/api/auth/redirect`);

  const json = await (
    await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers,
      body,
    })
  ).json();

  return {
    status: 200,
    body: {
      accessToken: json.access_token,
      refreshToken: json.refresh_token,
    },
  };
};
