import { NextFunction, Request, Response } from "express";
import { DestinationData } from "../models/DestinationData";
import { Collection } from "../models/enums";
import { passInternalServerError } from "../models/error/passInternalServerError";
import { DestinationTransitType } from "../models/types";


// from callWikiApi

export const saveDestinationInDb = async (req: Request, res: Response, next: NextFunction) => {
   const callWiki = res.locals.callWiki;
   if(!callWiki) return;
  
    const { name, content, coordinates, images } = { ...res.locals.destination } as DestinationTransitType;      
    const destinationData = new DestinationData();
    console.log("res.locals.destination in last", res.locals.destination);
    
    await destinationData.setOne(Collection.WIKI_DESTINATIONS, res.locals.destination).catch(err => next(passInternalServerError("error when saving destination in db"))); 

    if(!coordinates){
      res.status(200).json({
         destination: {
            name,
            content,
         },
      });
    }
    else if(coordinates.lat || coordinates.lng){  
       res.status(200).json({
         destination: {
            name,
            content,
            coordinates
         },
      });
   }

}