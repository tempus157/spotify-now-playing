import type { RequestHandler } from "@sveltejs/kit";

type Params = {
  id: string;
};

type Body = {
  output: Output;
};

export type Output = {
  track: {
    name: string;
    artist: string;
    albumArt: string;
  };
};

export const get: RequestHandler<Params, Body> = async ({ params }) => {
  const res = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    { headers: { Authorization: `Bearer ${params.id}` } }
  );

  if (res.status !== 200) {
    return { status: res.status };
  }

  const json = await res.json();
  if (!json.is_playing) {
    return { status: 204 };
  }

  return {
    body: {
      output: {
        track: {
          name: json.item.name,
          artist: json.item.artists
            .map((artist: { name: string }) => artist.name)
            .join(", "),
          albumArt: json.item.album.images[0].url,
        },
      },
    },
  };
};
