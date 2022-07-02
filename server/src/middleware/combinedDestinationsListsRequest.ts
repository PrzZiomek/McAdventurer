import { NextFunction, Request, Response } from "express";
import { errorHandle } from "../helpers/errorHandle";
import { Destinations } from "../models/Destination";
import { Table } from "../models/enums";
import { AllDestination, Destination, DestinationNameAndPosition, Locals } from "../models/types";

// from destinationListRequest 

export const combinedDestinationsRequest = async (req: Request, res: Response, next: NextFunction) => {
    const destinationsList =  res.locals.destinationsList as AllDestination[];
    const destination = new Destinations(); 

    const checkedDestinations: void | AllDestination[] | Destination[] =
      await destination
          .getAll(Table.Destination)
          .catch(err => next(errorHandle(err, 500))); 
    
      if (!checkedDestinations) {    
        return res.status(422).send({
          message: "database connection error" 
        });
  }
 
  const mergedDestsList = [...destinationsList, ...checkedDestinations] as (Destination & AllDestination)[];
  const combinedDestsLists: DestinationNameAndPosition[] = combineDests(mergedDestsList)
  //console.log("combinedDestsLists", combinedDestsLists);  
  res.status(200).send(combinedDestsLists);   
}


function combineDests(dests: (Destination & AllDestination)[]){
    return dests.reduce((acc: DestinationNameAndPosition[], poz: Destination & AllDestination) => {
        const obj = {
            country: poz.COUNTRY ? poz.COUNTRY : poz.CONTENT.slice(0, 20),
            name: poz?.NAME ? poz?.NAME : poz?.CITY,
            lat: poz?.LAT ? poz?.LAT : poz?.LAT ? poz?.LAT : "unset",
            lng: poz.LNG ? poz.LNG : poz?.LNG ? poz?.LNG : "unset",
        };
        acc.push(obj);
        return acc;
    }, [])
}