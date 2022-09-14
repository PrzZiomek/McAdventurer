import { NextFunction, Request, Response } from "express";

import { Collection } from "../../models/enums";
import { passInternalServerError } from "../../models/error/passInternalServerError";
import { passNotFoundError } from "../../models/error/passNotFoundError";
import { Locals } from "../../models/types";
import { getCollection } from "../../mongoDB/utils/getCollection";

declare module 'express' {
  interface Response  {
      locals: Locals;
    }
}

export const destinationRequest = async (req: Request, res: Response, next: NextFunction) => {
    const name: string = req.body.destination.name.trim(); 
    let callWiki = false;
    const destsColl = await getCollection(Collection.WIKI_DESTINATIONS).catch(() => next(passNotFoundError("db or wiki destination collection not found")));
    const destination = await destsColl?.findOne({name}).catch(err => next(passInternalServerError("error when calling db for one destination"))); 
    console.log("destination req", destination);
    
    if(destination){  
        res.status(200).json({
            destination: {
              name: destination.name,
              content: destination.content, 
              coordinates: {
                lat: destination.lat,
                lng: destination.lng
              },
              images: destination.images
            },
          });
    }

    if(!destination){
      callWiki = true;
    }

    res.locals.destinationName = req.body.destination.name;
    res.locals.callWiki = callWiki; 
    next();
} 

// next to callWikiApi