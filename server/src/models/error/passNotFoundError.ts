import { httpStatusCodes } from "../enums";
import { ExtendedError } from "./extendedError";


export const passNotFoundError = (desc: string) => new ExtendedError(
   "resource not found",
   httpStatusCodes.NOT_FOUND,
   desc
);