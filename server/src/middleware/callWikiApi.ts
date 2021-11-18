import request from "request";
import { NextFunction, Request, Response } from "express";

interface WikiApiResponse{
  query: {
    pageids: string[];
    pages: { [key: string]: {
      pageid: number,
      ns: number,
      title: string,
      extract: string
    }
  }
 }
}

 const pageImagesUrl = "https://en.wikipedia.org/w/api.php?action=query&titles={name}&prop=images&format=json";
 const pageCoordinatesUrl = "https://en.wikipedia.org/w/api.php?action=query&titles={name}&prop=coordinates&format=json";


 export const callWikiApi = async (req: Request, res: Response, next: NextFunction) => {
    const name = res.locals.destinationName;  
    const requestOptions = {
      url: `https://en.wikipedia.org/w/api.php?action=query&titles=${name}&prop=extracts&exintro&explaintext&format=json&exintro=1&indexpageids`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };
    request(requestOptions, function (err, response, body) {
      try{
        if(err) console.log("error when calling api: ", err);     
        const reqRes:WikiApiResponse = JSON.parse(body);
        const pageId = reqRes.query.pageids[0];
        const pageContent = reqRes.query.pages[pageId];
        console.log(pageContent.extract);          
      }
      catch (ex) {
        
      }
  });
  
  next();
};
  
  