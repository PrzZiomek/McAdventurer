import { NextFunction, Request, Response } from "express"; 
import axios  from "axios";
import { errorHandle } from "../helpers/errorHandle";

interface Destination {
      latitude: number,
      longitude: number,
      type: string,
      name: string,
      number: null,
      postal_code: null,
      street: null,
      confidence: number,
      region: string,
      region_code: string,
      county: string,
      locality: string,
      administrative_area: null,
      neighbourhood: null,
      country: string,
      country_code: string,
      continent: string,
      label: string
}

interface DestinationRes {
   data: Destination[]
}

 export const callPositionstackApi = async (req: Request, res: Response, next: NextFunction) => {

   const destination = res.locals.destination;
   const hasDestinationCoords: boolean = destination.coordinates.lat !== "unset" || destination.coordinates.lng !== "unset"; 

   if(!hasDestinationCoords){
      const params = {
         access_key: '8b7251d9992206506bbf41cdf3c3dd13',
         query: destination.name
         }
         const destinationRes: DestinationRes | void = await axios.get("http://api.positionstack.com/v1/forward", { params })
            .catch(err => next(errorHandle(err, 500)));
         if(!destinationRes.data) return;
         const firstDest = destinationRes.data.data[0]; // to do - support of multiple same name destinations handling!
         res.locals.destination = {
            content: `${firstDest.region}, ${firstDest.county}`,
            name: firstDest.name,
            coordinates: {
               lat: firstDest.latitude,
               lng: firstDest.longitude
             }
         }; 
         
         next();       
   }else{
      res.locals.destination = destination; 
      next();
   }  

 }