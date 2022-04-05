import type { RequestHandler } from "@sveltejs/kit";

type Params = {
  id: string;
};

export type NowPlaying = {
  name: string;
  artists: string[];
  albumArt: string;
};

export const get: RequestHandler<Params, NowPlaying> = async ({ params }) => {
  const res = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${params.id}`,
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
