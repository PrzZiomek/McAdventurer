import {  Destination } from "../generalTypes/apiResponse";
import { fetchData } from "./models/dataRequest";

export const fetchDestinationsList = async () => {
   return fetchData<Destination[] | void>(
      "http://localhost:3000/api/destinationsList", {
         method: "POST",   
      }
   )
}

