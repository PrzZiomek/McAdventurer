import { NextFunction, Request, Response } from "express";
import { Destination, Destinations } from "../models/Destination";

export const saveDestinationInDb = async (req: Request, res: Response, next: NextFunction) => {
    const callWiki = res.locals.callWiki; 
    if(!callWiki) return;  
    const {name, coordinates, content, images}: Destination = res.locals.destination;      
    const destinations = new Destinations(); 
    destinations.saveOne({
        name,
        content,
        coordinates,
        images
    })
    next()
}