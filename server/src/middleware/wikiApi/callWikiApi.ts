import { NextFunction, Request, Response } from "express";
import { DestinationData } from "../../models/DestinationData";

import { Destinations } from "../../models/Destinations";
import { Collection } from "../../models/enums";
import { passInternalServerError } from "../../models/error/passInternalServerError";
import { DestinationModel, DestinationTransitType, WikiPage } from "../../models/types";
import { getDestinationData } from "./getDestinationData";


// from destinationRequest

 export const callWikiApi = async (req: Request, res: Response, next: NextFunction) => {
  
    const name: string = res.locals.destinationName; 
    const callWiki: boolean = res.locals.callWiki;
    let destination: DestinationTransitType | 
      {coordinates: null | {lat: string, lng: string}} = {coordinates: null};

    if(!callWiki) return;  

    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${name}&prop=extracts|coordinates|pageimages&exintro&explaintext&format=json&exintro=1&indexpageids`
    const destinationRes: WikiPage | void = await getDestinationData(url).catch(err => next(passInternalServerError("error when calling wiki api for destination")));
    const { title, extract, coordinates, pageimage } = destinationRes as WikiPage;
    const destinationData = new DestinationData();

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
            lat: coordinates[0].lat,
            lng: coordinates[0].lon
          },
        }; 
        console.log("destination with coords!!!", destination);
        await destinationData.setOne(Collection.WIKI_DESTINATIONS, destination).catch(err => next(passInternalServerError("error when adding destination to db"))); 
        res.status(200).json({ destination });

    }else { 
      const destinationWithCoords = await destinationData.getOne<DestinationModel>(Collection.DESTINATIONS, {name}).catch(() => next(passInternalServerError("error when looking for destinations coords")));
      const coords: {lat: number, lng: number} = destinationWithCoords?.coordinates;

      if(coords && 
        coords.lat && coords.lng){ 
            destination = {
              ...destination,
              coordinates: coords
            }; 
            res.status(200).json({ destination });
      }else{
        res.locals.destination = destination; 
        next();
      }
      
    }

    
};

// next to callPositionstackApi




