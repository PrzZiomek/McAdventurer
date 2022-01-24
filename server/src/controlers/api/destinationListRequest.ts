import { NextFunction, Request, Response } from "express";
import { Destinations } from "../../models/Destination";
import { Table } from "../../models/enums";
import { AllDestination, Destination } from "../../models/types";
 

export const destinationListRequest = async (req: Request, res: Response, next: NextFunction) => {
   const destination = new Destinations();
   const allAestination = await destination.getAll(Table.Destinations_list) as AllDestination[];
   if (!allAestination) {    
      return res.status(422).send({
        message: "database connection error" 
      });
    }  
    res.locals.destinationsList = allAestination;
}
