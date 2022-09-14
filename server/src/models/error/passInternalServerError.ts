import { httpStatusCodes } from "../enums";
import { ExtendedError } from "./extendedError";


export const passInternalServerError = (desc: string) => new ExtendedError(
   "internal server error",
   httpStatusCodes.INTERNAL_SERVER,
   desc
);