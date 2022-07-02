import { NextFunction, Request, Response } from "express";

import { errorHandle } from "../../helpers/errorHandle";
import { Destinations } from "../../models/Destination";
import { Destination, DestinationTransitType, WikiPage } from "../../models/types";
import { getDestinationData } from "./getDestinationData";


// from destinationRequest

 export const callWikiApi = async (req: Request, res: Response, next: NextFunction) => {
  
    const name: string = res.locals.destinationName; 
    const callWiki: boolean = res.locals.callWiki;

    if(!callWiki) return;  

    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${name}&prop=extracts|coordinates|pageimages&exintro&explaintext&format=json&exintro=1&indexpageids`
    const destinationRes: WikiPage | void = await getDestinationData(url).catch(err => next(errorHandle(err, 500)));
   

    const { title, extract, coordinates, pageimage } = destinationRes;
    const destination: DestinationTransitType = {
      name: title,
      content: extract,
      coordinates: {
        lat: coordinates ?  coordinates[0].lat : "unset",
        lng: coordinates ? coordinates[0].lon : "unset"
      },
      images: pageimage ? pageimage : "unset"
    }; 


    res.locals.destination = destination; 
    next();
};

// next to callPositionstackApi




