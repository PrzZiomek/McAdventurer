import { NextFunction, Request, Response } from "express";
import { Destinations } from "../models/Destination";
import { Table } from "../models/enums";
import { AllDestination, Destination, Locals } from "../models/types";


export const combinedDestinationsRequest = async (req: Request, res: Response, next: NextFunction) => {
  const destinationsList =  res.locals.destinationsList as AllDestination[];
  const destination = new Destinations(); 
  const checkedDestinations = await destination.getAll(Table.Destination) as Destination[];
  if (!checkedDestinations) {    
   return res.status(422).send({
     message: "database connection error" 
   });
 } 
 res.status(200).send(dbRes);   
}

