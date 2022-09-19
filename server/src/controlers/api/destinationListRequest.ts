import { NextFunction, Request, Response } from "express";
import { DestinationData } from "../../models/DestinationData";

import { Collection } from "../../models/enums";
import { passInternalServerError } from "../../models/error/passInternalServerError";
import { DestinationModel  } from "../../models/types";


export const destinationListRequest = async (req: Request, res: Response, next: NextFunction) => {

   const destinationData = new DestinationData();
   const destinationsList = await destinationData.getList<DestinationModel>(Collection.DESTINATIONS).catch(() => next(passInternalServerError("error when looking for destinations list")));
   
   if (!destinationsList) {    
      return res.status(422).send({
        message: "database connection error" 
      });
    };   

    res.locals.destinationsList = destinationsList;
    next();
}

// next to combinedDestinationsRequest