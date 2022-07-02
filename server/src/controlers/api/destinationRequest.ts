import { NextFunction, Request, Response } from "express";
import { errorHandle } from "../../helpers/errorHandle";
import { Destinations } from "../../models/Destination";
import { Destination, Locals } from "../../models/types";

declare module 'express' {
  interface Response  {
      locals: Locals;
    }
}

export const destinationRequest = async (req: Request, res: Response, next: NextFunction) => {
    const name: string = req.body.destination.name.trim(); 
    let callWiki = false;
    const destinations = new Destinations();   
  
    const savedAlready: number | void = await destinations
            .checkIfSavedAlready(name)
            .catch(err => next(errorHandle(err, 500)));

    if(savedAlready >= 1){
        const destination: void | Destination = await destinations
            .getOne(name)
            .catch(err => next(errorHandle(err, 500))); console.log("dest !!!!", destination);
       if(destination){  
            res.status(200).json({
                destination: {
                  name: destination.NAME,
                  content: destination.CONTENT,
                  coordinates: {
                    lat: destination.LAT,
                    lng: destination.LNG
                  },
                  images: destination.IMAGES
                },
              });
        }
        callWiki = false;  
    };

    if(savedAlready === 0){
        callWiki = true;
    }
    
    res.locals.destinationName = req.body.destination.name;
    res.locals.callWiki = callWiki; 
    next();
} 

// next to callWikiApi