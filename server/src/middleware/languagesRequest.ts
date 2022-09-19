import { NextFunction, Request, Response } from "express";
import { DestinationData } from "../models/DestinationData";
import { Collection } from "../models/enums";
import { passInternalServerError } from "../models/error/passInternalServerError";
import { LanguagesModel } from "../models/types";


// from combinedDestinationsRequest 

export const languagesRequest = async (req: Request, res: Response, next: NextFunction) => {
   const destinationList = res.locals.combinedDestsLists; 

   const destinationData = new DestinationData();
   const destinationsLanguages = await destinationData.getList<LanguagesModel>(Collection.DESTINATIONS_LANGUAGES).catch(() => next(passInternalServerError("error when looking for destinations list")));
   
   res.status(200).send({
      destinationList,
      destinationsLanguages
   });   

   next();
}