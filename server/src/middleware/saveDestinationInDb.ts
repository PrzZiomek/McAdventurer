import { NextFunction, Request, Response } from "express";
import { Collection } from "../models/enums";
import { passInternalServerError } from "../models/error/passInternalServerError";
import { passNotFoundError } from "../models/error/passNotFoundError";
import { DestinationTransitType } from "../models/types";
import { getCollection } from "../mongoDB/utils/getCollection";

// from callWikiApi


export const saveDestinationInDb = async (req: Request, res: Response, next: NextFunction) => {
   const callWiki = res.locals.callWiki;
   if(!callWiki) return;
  
    const { name, content, coordinates, images } = { ...res.locals.destination } as DestinationTransitType;      

    console.log("res.locals.destination in last", res.locals.destination);
    
    const destsColl = await getCollection(Collection.WIKI_DESTINATIONS).catch(() => next(passNotFoundError("db or wiki destination collection not found")));
    const destinationSaved = await destsColl?.insertOne(res.locals.destination).catch(() => next(passInternalServerError("error when saving destination in db"))); 

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