import { Store } from "../state/types";


export const storeErrorHandler = (key: string) => (store: Store) => { 
   const checkIfLoading: boolean = key === "getDestinationList" || key === "getDestination";
   const stateErr = store[key].error;

   if(checkIfLoading && store[key as "getDestinationList"].loading !== false) 
      return;

   if(stateErr){
      return { isError: true, content: stateErr };
   }

   return { isError: false };
}