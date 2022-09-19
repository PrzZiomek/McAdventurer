import { NextFunction, Request, Response } from "express";
import { DestinationData } from "../../models/DestinationData";

import { Collection } from "../../models/enums";
import { passInternalServerError } from "../../models/error/passInternalServerError";
import { Locals, WikiDestinationModel } from "../../models/types";

declare module 'express' {
  interface Response  {
      locals: Locals;
    }
}

export const destinationRequest = async (req: Request, res: Response, next: NextFunction) => {
    const name: string = req.body.destination.name.trim(); 
    let callWiki = false;
    const destinationData = new DestinationData();
    const destination = await destinationData.getOne<WikiDestinationModel>(Collection.WIKI_DESTINATIONS, {name}).catch(() => next(passInternalServerError("error when looking for destination")));
      
    if(destination){  
        res.status(200).json({
            destination: {
              name: destination.name,
              content: destination.content, 
              coordinates: {
                lat: destination.coordinates.lat,
                lng: destination.coordinates.lng
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