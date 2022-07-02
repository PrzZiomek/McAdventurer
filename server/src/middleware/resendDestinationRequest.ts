import { NextFunction, Request, Response } from "express";
import { errorHandle } from "../helpers/errorHandle";
import { Destinations } from "../models/Destination";
import { Destination } from "../models/types";



export const resendDestinationRequest = async (req: Request, res: Response, next: NextFunction) => {
      const destinations = new Destinations();  
      const name = req.query.name as string;

      const destination: void | Destination = await destinations
         .getOne(name)
         .catch(err => next(errorHandle(err, 500)));  console.log("destination second time!", destination);   

      if(destination){  
         res.status(200).json({
            destination: {
               name: destination.NAME,
               content: destination.CONTENT,
               coordinates: {
                  lat: destination.LAT,
                  lng: destination.LNG
               },
            },
         });
      }else{ 
         return res.status(422).send({
            message: "database error"
         });
      }
}