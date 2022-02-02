import { Destination } from "../dataModels/types";
import { fetchData } from "./models/dataRequest";



export const fetchDestination = async (name: string): Promise<{destination: Destination}> => {
    return fetchData<{destination: Destination}>(
        "http://localhost:3000/api/destination", {
            method: "POST",
            body: JSON.stringify({
                destination: { name }
            })
        }
    )
}







/*
export const fetchDestination = async (name: string): Promise<{destination: Destination}> => {

   const res = await fetch("http://localhost:3000/api/destination", {
      method: "POST",
          headers:{
             // "Cookie": "login=true",              !!! to set
              "Content-Type": "application/json",
             // "Authorization": "Bearer " + token,  !!! to set
          },
          body: JSON.stringify({
              destination: {
                  name,
              }
          })           
    })
    .then(res => {
        if(!res.ok){
            throw new ErrorObject({
                message: res.statusText,
                apiRes: "server connection error"
            }); 
       };  
       return res;
    }) ;

   const resJson = res.json();
  return resJson;
}

*/