import { ErrorObject } from "./models/ErrorObject";


export const getDestinationsList = async (destinations: string[]) => {
   
   const res = await fetch("http://localhost:3000/api/destinationsList", {
      method: "GET",
          headers:{
             // "Cookie": "login=true",              !!! to set
              "Content-Type": "application/json",
             // "Authorization": "Bearer " + token,  !!! to set
          },
          body: JSON.stringify({
            destinations
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