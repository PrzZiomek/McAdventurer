import { NextFunction, Request, Response } from "express";

import { Destinations } from "../../models/Destination";
import { Collection } from "../../models/enums";
import { passInternalServerError } from "../../models/error/passInternalServerError";
import { passNotFoundError } from "../../models/error/passNotFoundError";
import { Destination, DestinationTransitType, WikiPage } from "../../models/types";
import { getCollection } from "../../mongoDB/utils/getCollection";
import { getDestinationData } from "./getDestinationData";


// from destinationRequest

 export const callWikiApi = async (req: Request, res: Response, next: NextFunction) => {
  
    const name: string = res.locals.destinationName; 
    const callWiki: boolean = res.locals.callWiki;
    const destAction = new Destinations();
    let destination: DestinationTransitType | 
      {coordinates: null | {lat: string, lng: string}} = {coordinates: null};

    if(!callWiki) return;  

    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${name}&prop=extracts|coordinates|pageimages&exintro&explaintext&format=json&exintro=1&indexpageids`
    const destinationRes: WikiPage | void = await getDestinationData(url).catch(err => next(passInternalServerError("error when calling wiki api for destination")));
    const { title, extract, coordinates, pageimage } = destinationRes as WikiPage;
console.log("from wiki", destinationRes);

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
        const destsColl = await getCollection(Collection.WIKI_DESTINATIONS).catch(() => next(passNotFoundError("db or wiki destination collection not found")));
        const destinationSaved = await destsColl?.insertOne(destination).catch(err => next(passInternalServerError("error when inserting destination db"))); 
        res.status(200).json({ destination });
    }else { 
      const destsColl = await getCollection(Collection.DESTINATIONS).catch(() => next(passNotFoundError("db or wiki destination collection not found")));
      const destinationWithCoords = await destsColl?.findOne({name}).catch(() => next(passInternalServerError("error when calling db for destination"))); console.log("destination cord", destination);
      const coords: {lat: number, lng: number} = destinationWithCoords?.coordinates;
        
      if(coords && 
        coords.lat && coords.lng){ 
            destination = {
              ...destination,
              coordinates: coords
            }; 
            res.status(200).json({ destination });
      }
      
      res.locals.destination = destination; 
      next();
    }

    
};

// next to callPositionstackApi




