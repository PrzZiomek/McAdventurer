import { NextFunction, Request, Response } from "express";
import { errorHandle } from "../helpers/errorHandle";
import { Destinations } from "../models/Destination";
import { Collection, Table } from "../models/enums";
import { AllDestination, Destination, DestinationNameAndPosition, Locals } from "../models/types";
import { getCollection } from "../mongoDB/utils/getCollection";

// from destinationListRequest 

export const combinedDestinationsRequest = async (req: Request, res: Response, next: NextFunction) => {
  const destinationsList =  res.locals.destinationsList as AllDestination[];

  const destsColl = await getCollection(Collection.WikiDestinations);

  const checkedDestsRes = await destsColl.find({}).toArray().catch(err => errorHandle(err, 500)); 
  const checkedDestinations = checkedDestsRes[0].items;

  const mergedDestsList = [...destinationsList, ...checkedDestinations] as (Destination & AllDestination)[];
  const combinedDestsLists: DestinationNameAndPosition[] = combineDests(mergedDestsList); 
  res.locals.combinedDestsLists = combinedDestsLists; 
  next();
}




function combineDests(dests: (Destination & AllDestination)[]){
    return dests.reduce((acc: DestinationNameAndPosition[], poz: Destination & AllDestination) => {
        const obj = {
            country: poz?.country ? poz?.country : poz?.content && poz?.content.slice(0, 20),  
            name: poz?.name ? poz?.name : poz?.city,
            lat: poz?.coordinates.lat ? poz?.coordinates.lat : "unknown",
            lng: poz?.coordinates.lng ? poz?.coordinates.lng : "unknown",
        };
        acc.push(obj);
        return acc;
    }, [])
}

// to languagesRequest

  /*  country: poz.COUNTRY ? poz.COUNTRY : poz?.CONTENT.slice(0, 20),
            name: poz?.NAME ? poz?.NAME : poz?.CITY,
            lat: poz?.LAT ? poz?.LAT : poz?.LAT ? poz?.LAT : "unset",
            lng: poz.LNG ? poz.LNG : poz?.LNG ? poz?.LNG : "unset",
            */