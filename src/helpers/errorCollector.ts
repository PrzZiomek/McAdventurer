
import { Store } from "../state/types";



type ErrorObject = { isError: true, content: Error }[] & { isError: false }[]


export const errorCollector = (store: Store) => {

   return (acc: ErrorObject, key: string) => {

      const stateErr = store[key].error;
      
      if(stateErr){
         acc!.push({ isError: true, content: stateErr });
      }
   
      acc!.push({ isError: false });
      return acc;  
   }
} 