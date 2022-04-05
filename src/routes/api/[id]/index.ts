import { getUserModel } from "$libs/mongoose";
import type { RequestHandler } from "@sveltejs/kit";

type Params = {
  id: string;
};

export type NowPlaying = {
  name: string;
  artists: string[];
  albumArt: string;
};

export const get: RequestHandler<Params, NowPlaying> = async ({
  params,
  url,
}) => {
  const secret = url.searchParams.get("secret");
  if (!secret) {
    return { status: 400 };
  }

  const UserModel = await getUserModel();
  const user = await UserModel.findOne({ spotifyID: params.id });
  if (secret !== user._id.toString()) {
    return { status: 401 };
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
