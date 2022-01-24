import { Destination } from "../dataModels/destinationsList";
import { ErrorObject } from "./models/ErrorObject";


export const fetchDestinationsList = async (): Promise<Destination[]> => {
   
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