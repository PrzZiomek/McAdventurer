import { NextFunction, Request, Response } from "express";
import { errorHandle } from "../../helpers/errorHandle";
import { Destinations } from "../../models/Destination";
import { Collection } from "../../models/enums";
import { Destination, Locals } from "../../models/types";
import { getCollection } from "../../mongoDB/utils/getCollection";

declare module 'express' {
  interface Response  {
      locals: Locals;
    }
}

export const destinationRequest = async (req: Request, res: Response, next: NextFunction) => {
    const name: string = req.body.destination.name.trim(); 
    let callWiki = false;
    const destsColl = await getCollection(Collection.WikiDestinations);
    const destination = await destsColl.findOne({name}).catch(err => errorHandle(err, 500)); 
    console.log("name", name);
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