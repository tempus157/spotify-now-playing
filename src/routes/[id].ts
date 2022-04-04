import type { RequestHandler } from "@sveltejs/kit";

type Params = {
  id: string;
};

export type Output = {
  name: string;
  artists: string[];
  albumArt: string;
};

export const get: RequestHandler<Params, Output> = async ({ params }) => {
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

  const json = (await res.json()).item;
  return {
    body: {
      name: json.name,
      artists: json.artists.map((artist: { name: string }) => artist.name),
      albumArt: json.album.images[0].url,
    },
  };
};
