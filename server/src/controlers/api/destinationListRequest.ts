import { NextFunction, Request, Response } from "express";
import { errorHandle } from "../../helpers/errorHandle";
import { Destinations } from "../../models/Destination";
import { Collection, Table } from "../../models/enums";
import { ExtendedError } from "../../models/extendedError";
import { AllDestination } from "../../models/types";
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

   const destsColl = await getCollection(Collection.Destinations);
 
   const destsListRes = await destsColl.find({}).toArray().catch(err => errorHandle(err, 500));
   const destinationsList = destsListRes[0]?.items;
   
   if (!destinationsList) {    
      return res.status(422).send({
        message: "database connection error" 
      });
    };   

    res.locals.destinationsList = destinationsList;
    next();
}

// next to combinedDestinationsRequest