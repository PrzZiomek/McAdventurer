import { NextFunction, Request, Response } from "express";

import { errorHandle } from "../../helpers/errorHandle";
import { Destinations } from "../../models/Destination";
import { Destination, DestinationTransitType, WikiPage } from "../../models/types";
import { getDestinationData } from "./getDestinationData";


// from destinationRequest

 export const callWikiApi = async (req: Request, res: Response, next: NextFunction) => {
  
    const name: string = res.locals.destinationName; 
    const callWiki: boolean = res.locals.callWiki;
    const destAction = new Destinations();
    const coords = { lat: "", lon: "" };
    let destination: DestinationTransitType | 
      {coordinates: null | {lat: string, lng: string}} = {coordinates: null};

    if(!callWiki) return;  

    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${name}&prop=extracts|coordinates|pageimages&exintro&explaintext&format=json&exintro=1&indexpageids`
    const destinationRes: WikiPage | void = await getDestinationData(url).catch(err => next(errorHandle(err, 500)));
    console.log("wikiSest@@@", destinationRes);
    const { title, extract, coordinates, pageimage } = destinationRes as WikiPage;

    if(destinationRes){
      destination = {
        name: title,
        content: extract,
        images: pageimage ? pageimage : "unset"
      }; 
    }
    if(coordinates){
        destination = {
          ...destination,
          coordinates: {
            lat: coordinates[0].lat || coords.lat,
            lng: coordinates[0].lon || coords.lat
          },
        }; 
        res.status(200).json({ destination });
    }
    
    const destinationCoords = await destAction.getOneCoords(name).catch(err => next(errorHandle(err, 500))) as Destination;
    if(destinationCoords?.lat && destinationCoords?.lng){ 
      destination = {
        ...destination,
        coordinates: {
          lat:destinationCoords.lat,
          lng:  destinationCoords.lng
        },
      }; 
      res.status(200).json({ destination })
    }
    


    console.log("coords from getonecords", coords);
    
    res.locals.destination = destination; 
    next();
};

// next to callPositionstackApi




