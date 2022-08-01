import { ErrorObject } from "./ErrorObject";

interface QueryData {
   method: "POST" | "GET" | "PUT" | "DELETE",
   body?: BodyInit | null | undefined
}

 
export const fetchData = async <T>(url: string, queryData: QueryData): Promise<T> => {
   const res = await fetch(url, {
      method: queryData.method,
          headers:{
             // "Cookie": "login=true",              !!! to do 
              "Content-Type": "application/json",
             // "Authorization": "Bearer " + token,  !!! to do
          },
          body: queryData.body ? queryData.body : null         
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