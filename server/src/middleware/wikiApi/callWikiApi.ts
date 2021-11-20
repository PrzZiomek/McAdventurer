import request from "request";
import { NextFunction, Request, Response } from "express";

import { errorHandle } from "../../helpers/errorHandle";
import { getDestinationData } from "./getDestinationData";

 const pageImagesUrl = "https://en.wikipedia.org/w/api.php?action=query&titles={name}&prop=images&format=json";
 const pageCoordinatesUrl = "https://en.wikipedia.org/w/api.php?action=query&titles={name}&prop=coordinates&format=json";


 export const callWikiApi = async (req: Request, res: Response, next: NextFunction) => {
    const name = res.locals.destinationName;  
    const requestOptions = {
        url: `https://en.wikipedia.org/w/api.php?action=query&titles=${name}&prop=extracts|coordinates|pageimages&exintro&explaintext&format=json&exintro=1&indexpageids`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };
    const destinationRes = await getDestinationData(requestOptions.url).catch(err => next(errorHandle(err, 500)));
    if(!destinationRes) return;
    const { title, extract, coordinates } = destinationRes;
    const destination = {
      name: title,
      description: extract,
      coordinates: {
        lat: coordinates[0].lat,
        lon: coordinates[0].lon
      }
    }
    console.log(destination);      
    next();
};
  
  /*
parameters for extracts: exintro=1&explaintext=1&exlimit=20 (max exlimit is 20)

parameters for coordinates: coprop=type|dim|globe&colimit=20 (max colimit is 500)

parameters for pageimages: piprop=thumbnail&pithumbsize=400&pilimit=20 (max is 50)
 */