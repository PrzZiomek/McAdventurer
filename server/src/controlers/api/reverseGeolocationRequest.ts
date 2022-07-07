import axios, { AxiosResponse } from "axios";
import { NextFunction, Request, Response } from "express";

import { errorHandle } from "../../helpers/errorHandle";
import { Destinations } from "../../models/Destination";
import { Destination, Locals } from "../../models/types";


export const reverseGeolocationRequest = async (req: Request, res: Response, next: NextFunction) => {

   const coordinates: {lat: string, lng: string} = req.body.coordinates; 
   const destinations = new Destinations();   
   const params = {
    access_key: '8b7251d9992206506bbf41cdf3c3dd13',
    query:`${coordinates.lat},${coordinates.lng}` // `51.507822,-0.076702`
  }

   let destination: void | Destination | AxiosResponse<unknown> = await destinations
      .getOne(coordinates, "destination")
      .catch(err => next(errorHandle(err, 500))); 
          
   if(!destination){  
        destination = await destinations
          .getOne(coordinates, "destinations_list")
          .catch(err => next(errorHandle(err, 500))); 
    }
  
    if(!destination || destination.LAT === "unset"){
      destination  = await axios.get<unknown>("http://api.positionstack.com/v1/reverse", { params })
        .catch(err => next(errorHandle(err, 500)));
    }
    console.log("reverseGeoRes!!!. ", destination);
    
    if(destination){
        res.status(200).json({
          destination: {
            name: destination.NAME,
            content: destination?.CONTENT,
            coordinates: {
              lat: destination?.LAT,
              lng: destination?.LNG
            },
            images: destination?.IMAGES
          },
        });
    }

} 


