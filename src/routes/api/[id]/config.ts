import { getUserModel } from "$libs/mongoose";
import type { RequestHandler } from "@sveltejs/kit";

type Params = {
  id: string;
};

export type Config = {
  nameColor: string;
  artistColor: string;
  backgroundColor: string;
  backgroundOpacity: number;
  cornerRounding: number;
};

export const get: RequestHandler<Params, Config> = async ({ params }) => {
  const UserModel = await getUserModel();
  const user = await UserModel.findOne({ spotifyID: params.id }).exec();
  if (!user) {
    return { status: 404 };
  }

  return {
    status: 200,
    body: {
      nameColor: user.nameColor,
      artistColor: user.artistColor,
      backgroundColor: user.backgroundColor,
      backgroundOpacity: user.backgroundOpacity,
      cornerRounding: user.cornerRounding,
    },
  };
};
