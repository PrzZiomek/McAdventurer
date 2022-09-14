import { NextFunction, Request, Response } from "express";
import { Collection } from "../models/enums";
import { passInternalServerError } from "../models/error/passInternalServerError";
import { passNotFoundError } from "../models/error/passNotFoundError";
import { getCollection } from "../mongoDB/utils/getCollection";


// from combinedDestinationsRequest 

export const languagesRequest = async (req: Request, res: Response, next: NextFunction) => {

   const destinationList = res.locals.combinedDestsLists; 

   const destsColl = await getCollection(Collection.DESTINATIONS_LANGUAGES).catch(() => next(passNotFoundError("db or wiki destinations languages collection not found")));

   const destsLangRes = await destsColl?.find({}).toArray().catch(() => next(passInternalServerError("error when calling db for destinations languages"))); 
   const destinationsLanguages = destsLangRes?.[0].items;
   
   res.status(200).send({
      destinationList,
      destinationsLanguages
   });   

   next();
}