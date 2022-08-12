import { NextFunction, Request, Response } from "express";
import { errorHandle } from "../helpers/errorHandle";
import { Destinations } from "../models/Destination";
import { Table } from "../models/enums";


// from combinedDestinationsRequest 

export const languagesRequest = async (req: Request, res: Response, next: NextFunction) => {

   const destinationList = res.locals.combinedDestsLists; 
   const destination = new Destinations();
   const languages = await destination
      .getAll(Table.Languages)
      .catch(err => next(errorHandle(err, 500))); console.log("languages before send", languages);

   if (!languages) {    
      return res.status(422).send({
         message: "database connection error" 
         });
   }; 

   res.status(200).send({
      destinationList,
      languages
   });   
}