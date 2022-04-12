import { clientID, clientSecret } from "$libs/config";
import { UserModel } from "$libs/models";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async ({ url }) => {
  const code = url.searchParams.get("code");
  const token = await fetchToken(code, url);
  const tokenExpiration = Date.now() + token.expires_in * 1000;
  const accessToken = token.access_token;
  const refreshToken = token.refresh_token;

  const profile = await (
    await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  ).json();

  await UserModel.updateOne(
    { spotifyID: profile.id },
    { tokenExpiration, accessToken, refreshToken },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return {
    status: 302,
    headers: {
      location: `${url.origin}/${profile.id}/config`,
    },
  };
};

async function fetchToken(code: string, url: URL) {
  const headers = {
    Authorization: `Basic ${Buffer.from(`${clientID}:${clientSecret}`).toString(
      "base64"
    )}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const body = new URLSearchParams();
  body.set("grant_type", "authorization_code");
  body.set("code", code);
  body.set("redirect_uri", `${url.origin}/api/auth/redirect`);

  return await (
    await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers,
      body,
    })
  ).json();
}
