import { NextFunction, Request, Response } from "express";
import { Destinations } from "../models/Destination";
import { DestinationTransitType } from "../models/types";

// from callWikiApi

export const saveDestinationInDb = async (req: Request, res: Response, next: NextFunction) => {
    const callWiki: boolean = res.locals.callWiki; 
    if(!callWiki) return;  
    const {name, content, coordinates, images } = res.locals.destination as DestinationTransitType;      
    const destinations = new Destinations(); 
    destinations.saveOne({
        name,
        content,
        coordinates,
        images
    })
    next()
}