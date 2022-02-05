import { Destination, DestinationNameAndPos } from "../dataModels/types";
import { fetchData } from "./models/dataRequest";
import { ErrorObject } from "./models/ErrorObject";
import { store } from "../state/store";
import { Action } from "redux";
import  {getErrorAction, setErrorAction} from "../state/actions/errorActions";
import { asyncActionCreator } from "./asyncActionCreator";
import { Dispatch } from "react";

// : Promise<DestinationNameAndPos[] | void> 

export const fetchDestinationsList = async () => {
   return fetchData<DestinationNameAndPos[] | void>(
      "http://localhost:3000/api/destinationsList", {
         method: "POST",   
      }
   )
}



/*.catch((err) => 
       dispatch(asyncActionCreator(errorAction({
            message: "error occured when fetching Destinations list from API",
            content: err
            }) 
         )
      )                       
   )*/














/*
export const fetchDestinationsList = async (): Promise<DestinationNameAndPos[]> => {
   
   const res = await fetch("http://localhost:3000/api/destinationsList", {
      method: "POST",    
          headers:{
             // "Cookie": "login=true",              !!! to set
              "Content-Type": "application/json",
             // "Authorization": "Bearer " + token,  !!! to set
          }, 
    })
    .then(res => {
        if(!res.ok){
            throw new ErrorObject({
                message: res.statusText,
                apiRes: "server connection error"
            }); 
       };  
       return res;
    })
    .catch(e => console.log("err in fetch: ", e));

   const resJson = res?.json();

   return resJson;
}

*/