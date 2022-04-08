import { envError } from "./error";

export const indexURI =
  import.meta.env.VITE_INDEX_URI ?? envError("VITE_INDEX_URI");
