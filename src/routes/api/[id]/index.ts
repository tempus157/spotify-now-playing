import { clientID, clientSecret } from "$libs/env";
import { getUserModel } from "$libs/mongoose";
import type { RequestHandler } from "@sveltejs/kit";
import type { User } from "$libs/mongoose";

type Params = {
  id: string;
};

export type NowPlaying = {
  name: string;
  artists: string[];
  albumArt: string;
};

async function refreshToken(user: User) {
  const headers = {
    Authorization: `Basic ${Buffer.from(`${clientID}:${clientSecret}`).toString(
      "base64"
    )}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const body = new URLSearchParams();
  body.set("grant_type", "refresh_token");
  body.set("refresh_token", user.refreshToken);

  return await (
    await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers,
      body,
    })
  ).json();
}

export const get: RequestHandler<Params, NowPlaying> = async ({
  params,
  url,
}) => {
  const secret = url.searchParams.get("secret");
  const UserModel = await getUserModel();
  const user = await UserModel.findOne({ spotifyID: params.id });

  if (!secret) {
    return { status: 400 };
  } else if (!user) {
    return { status: 404 };
  } else if (secret !== user._id.toString()) {
    return { status: 401 };
  }

  if (user.tokenExpiration <= Date.now()) {
    const token = await refreshToken(user);
    user.tokenExpiration = Date.now() + token.expires_in * 1000;
    user.accessToken = token.access_token;
    user.save();
  }

  const res = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    }
  );

  if (res.status !== 200) {
    return { status: res.status };
  }

  const json = await res.json();
  if (!json.is_playing) {
    return { status: 204 };
  }

  return {
    status: 200,
    body: {
      name: json.item.name,
      artists: json.item.artists.map((artist: { name: string }) => artist.name),
      albumArt: json.item.album.images[0].url,
    },
  };
};
