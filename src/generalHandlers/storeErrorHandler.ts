import { Store } from "../state/types";

type ErrorObject = { isError: true, content: Error }[] & { isError: false }[]


export const storeErrorHandler = (keys: string[]) => (store: Store) => { 

   return keys.reduce((acc: ErrorObject, key: string) => {

     // const checkIfLoading: boolean = key === "getDestinationList" || key === "getDestination";
      const stateErr = store[key].error;
    //  console.log("acc", acc);
      
     // if(checkIfLoading && store[key as "getDestinationList"].loading !== false) 
     //    return;
   
      if(stateErr){
         acc!.push({ isError: true, content: stateErr });
      }
   
      acc!.push({ isError: false });
      return acc;

   }, []) 

}