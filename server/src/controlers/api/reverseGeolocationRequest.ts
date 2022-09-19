import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { DestinationData } from "../../models/DestinationData";

import { Collection } from "../../models/enums";
import { passInternalServerError } from "../../models/error/passInternalServerError";
import { WikiDestinationModel } from "../../models/types";

interface ResponseData {
    latitude: number ,
    longitude: number,
    type: string,
    distance: number,
    name: string,
    number: number | null,
    postal_code: number | null,
    street: number | null,
    confidence:number,
    region: string,
    region_code: string,
    county: string,
    locality: string,
    administrative_area: string,
    neighbourhood: string | null,
    country: string,
    country_code: string,
    continent: string,
    label: string
}


export const reverseGeolocationRequest = async (req: Request, res: Response, next: NextFunction) => {

   const { lat, lng }: {lat: string, lng: string} = req.body.coordinates; 
   if(!lat && !lng) return;
   const params = {
      access_key: '8b7251d9992206506bbf41cdf3c3dd13',
      query:`${lat},${lng}` 
  };
  const destinationData = new DestinationData();
  const destination = await destinationData.getOne<WikiDestinationModel>(Collection.WIKI_DESTINATIONS, { coordinates: { lat, lng } }).catch(() => next(passInternalServerError("error when looking for destination with coords")));

  if(!destination || (destination.coordinates.lat === 0 && destination.coordinates.lng === 0)){
      const response = await axios.get<{data: ResponseData[]}>("http://api.positionstack.com/v1/reverse", { params })
        .then(res => res.data)
        .catch(() =>  next(passInternalServerError("error when calling reverse api")));
    
      if(response && response.data){
          const destinations = response.data.map(dest => ({ 
              name: dest.name,
              region: dest.region,
              county: dest.county,
              locality: dest.locality,
              country: dest.country,
              label: dest.label
          }))

          res.status(200).json({
            destinations
          });
      }
      else {
        const destination = await destinationData.getOne<WikiDestinationModel>(Collection.DESTINATIONS, { coordinates: { lat, lng } }).catch(() => next(passInternalServerError("error when looking for destination with coords")));

        if(destination){
          res.status(200).json({
            destination
          });
        }
      }
  };

    next();

} 

