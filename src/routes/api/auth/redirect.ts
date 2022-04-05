import { clientID, clientSecret, indexURI } from "$libs/env";
import { getUserModel } from "$libs/mongoose";
import type { RequestHandler } from "@sveltejs/kit";

async function fetchToken(code: string) {
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

  return await (
    await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers,
      body,
    })
  ).json();
}

export const get: RequestHandler = async ({ url }) => {
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  // TODO Compare with prev state
  if (!state) {
    return { status: 302, headers: { location: indexURI } };
  }

  const token = await fetchToken(code);
  const accessToken = token.access_token;
  const refreshToken = token.refresh_token;

  const profile = await (
    await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  ).json();

  const UserModel = await getUserModel();
  await UserModel.findOneAndUpdate(
    { spotifyID: profile.id },
    { accessToken, refreshToken },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).exec();

  return { status: 302, headers: { location: indexURI } };
};
