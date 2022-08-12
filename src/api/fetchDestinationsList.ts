import {  Destination, Language } from "../generalTypes/apiResponse";
import { fetchData } from "./models/dataRequest";

type Response = {
   destinationList: Destination[],
   languages: Language[]
}

export const fetchDestinationsList = async () => {
   return fetchData<Response | void>(
      "http://localhost:3000/api/destinationsList", {
         method: "POST",   
      }
   )
}

