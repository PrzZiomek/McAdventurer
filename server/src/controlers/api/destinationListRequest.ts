import { NextFunction, Request, Response } from "express";

import { Collection } from "../../models/enums";
import { passInternalServerError } from "../../models/error/passInternalServerError";
import { passNotFoundError } from "../../models/error/passNotFoundError";
import { getCollection } from "../../mongoDB/utils/getCollection";

type DestinationsListResponse =  {
   _id: string,
   items: {
      city: string,
      country: string,
      coordinates: {
         lat: number | string,
         lng: number | string
      }
   }
}

export const destinationListRequest = async (req: Request, res: Response, next: NextFunction) => {

   const destsColl = await getCollection(Collection.DESTINATIONS).catch(() => next(passNotFoundError("db or destination collection not found")));
   const destsListRes = await destsColl?.find({}).toArray().catch(() => next(passInternalServerError("error when calling db for destinations list")));
   const destinationsList = destsListRes?.[0]?.items;
   
   if (!destinationsList) {    
      return res.status(422).send({
        message: "database connection error" 
      });
    };   

    res.locals.destinationsList = destinationsList;
    next();
}

// next to combinedDestinationsRequest