import { NextFunction, Request, Response } from "express";
import { errorHandle } from "../helpers/errorHandle";
import { Destinations } from "../models/Destination";
import { Collection, Table } from "../models/enums";
import { getCollection } from "../mongoDB/utils/getCollection";


// from combinedDestinationsRequest 

export const languagesRequest = async (req: Request, res: Response, next: NextFunction) => {

   const destinationList = res.locals.combinedDestsLists; 

   const destsColl = await getCollection(Collection.DestinationsLanguages);

   const destsLangRes = await destsColl.find({}).toArray().catch(err => errorHandle(err, 500)); 
   const destinationsLanguages = destsLangRes[0].items;
   
   res.status(200).send({
      destinationList,
      destinationsLanguages
   });   
}