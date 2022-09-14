import { NextFunction, Request, Response } from "express";
import { ExtendedError } from "../models/error/extendedError";


export const handleErrors = (err: ExtendedError, req: Request, res: Response, next: NextFunction) => {

   console.log(err);
   res.status(err.statusCode).send({ message: err.name})
}