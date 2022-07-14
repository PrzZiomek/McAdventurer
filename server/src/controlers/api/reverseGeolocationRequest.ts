import axios, { AxiosResponse } from "axios";
import { NextFunction, Request, Response } from "express";

import { errorHandle } from "../../helpers/errorHandle";
import { Destinations } from "../../models/Destination";
import { Destination, Locals } from "../../models/types";

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

   const coordinates: {lat: string, lng: string} = req.body.coordinates; 
   if(!coordinates?.lat && !coordinates?.lng) return;
   const destinations = new Destinations();   
   const params = {
    access_key: '8b7251d9992206506bbf41cdf3c3dd13',
    query:`${coordinates?.lat},${coordinates?.lng}` // `51.507822,-0.076702`
  }

   let destination: void | Destination | AxiosResponse<unknown> = await destinations
      .getOne(coordinates, "destination")
      .catch(err => next(errorHandle(err, 500))); 
          
   if(!destination){  
        destination = await destinations
          .getOne(coordinates, "destinations_list")
          .catch(err => next(errorHandle(err, 500))); 
    }

    if(destination){
      res.status(200).json({
        destination
      });
   }
  
    if(!destination || destination.LAT === "unset"){
        const response = await axios.get<{data: ResponseData[]}>("http://api.positionstack.com/v1/reverse", { params })
          .then(res => res.data)
          .catch(err => next(errorHandle(err, 500)));
      console.log("responsedata????", response.data);
      
        if(response.data){
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
    }

} 

