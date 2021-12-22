import { NextFunction, Request, Response } from "express";
import { errorHandle } from "../../helpers/errorHandle";
import { Destination, Destinations } from "../../models/Destination";

interface Locals {
  destinationName: string;
  callWiki: boolean;
  destination: Destination; 
}

declare module 'express' {
  interface Response  {
      locals: Locals;
    }
}

export const destinationRequest = async (req: Request, res: Response, next: NextFunction) => {
    const name = req.body.destination.name;
    let callWiki = false;
    const destinations = new Destinations(); 
    const savedAlready = await destinations.checkIfSavedAlready(name).catch(err => next(errorHandle(err, 500)));
    if (savedAlready == null) {    
      return res.status(422).send({
        message: "database connection error"
      });
    } 
    if(savedAlready === 1){
        const destination = await destinations.getOne(name).catch(err => next(errorHandle(err, 500)));
        if(destination){
            res.status(200).json({
                destination,
              });
        }else{
            return res.status(422).send({
              message: "database error"
            });
        }
        callWiki = false;  
    };
    if(savedAlready === 0){
        callWiki = true;
    }
    res.locals.destinationName = req.body.destination.name;
    res.locals.callWiki = callWiki; 
    next();
} 