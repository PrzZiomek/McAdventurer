import { NextFunction, Request, Response } from "express";
import { DestinationData } from "../models/DestinationData";
import { Collection } from "../models/enums";
import { passInternalServerError } from "../models/error/passInternalServerError";
import { DestinationModel, DestinationNameAndPosition, WikiDestinationModel } from "../models/types";


// from destinationListRequest 

export const combinedDestinationsRequest = async (req: Request, res: Response, next: NextFunction) => {
  const destinationsList =  res.locals.destinationsList;

  const destinationData = new DestinationData();
  const checkedDestinations = await destinationData.getList<WikiDestinationModel>(Collection.WIKI_DESTINATIONS).catch(() => next(passInternalServerError("error when looking for destinations list")));
  
  let mergedDestsList = [...destinationsList] as DestinationModel[] & WikiDestinationModel[];
  if(checkedDestinations) mergedDestsList.concat(checkedDestinations)

  const combinedDestsLists: DestinationNameAndPosition[] = combineDests(mergedDestsList); 
  res.locals.combinedDestsLists = combinedDestsLists; 
  
  next();
}
 



function combineDests(dests: DestinationModel[] & WikiDestinationModel[]){
    return dests.reduce((acc, poz: DestinationModel & WikiDestinationModel) => {
        const obj = {
            country: poz?.country ? poz?.country : poz?.content && poz?.content.slice(0, 20),  
            name: poz?.name ? poz?.name : poz?.city,
            lat: poz?.coordinates?.lat ? poz?.coordinates?.lat : "unknown",
            lng: poz?.coordinates?.lng ? poz?.coordinates?.lng : "unknown",
        };
        acc.push(obj);
        return acc;
    }, [])
}

// to languagesRequest

