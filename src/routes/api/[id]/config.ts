import { getUserModel } from "$libs/mongoose";
import type { RequestHandler } from "@sveltejs/kit";

type Params = {
  id: string;
};

export type Config = {
  secret: string;
  nameColor: string;
  artistColor: string;
  backgroundColor: string;
  backgroundOpacity: number;
  cornerRounding: number;
};

export const get: RequestHandler<Params, Config> = async ({ params }) => {
  const UserModel = await getUserModel();
  const user = await UserModel.findOne({ spotifyID: params.id });
  if (!user) {
    return { status: 404 };
  }

  return {
    status: 200,
    body: {
      secret: user._id.toString(),
      nameColor: user.nameColor,
      artistColor: user.artistColor,
      backgroundColor: user.backgroundColor,
      backgroundOpacity: user.backgroundOpacity,
      cornerRounding: user.cornerRounding,
    },
  };
};

export const put: RequestHandler<Params> = async ({ request, params }) => {
  const config: Config = await request.json();
  const UserModel = await getUserModel();
  await UserModel.updateOne({ spotifyID: params.id }, { ...config });
  return { status: 200 };
};
