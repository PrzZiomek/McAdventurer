import { ErrorCollection } from "../components/searchingMap/SearchingMap";
import { Store } from "../state/types";

//type ErrorUseStateFields = [error: ErrorCollection, setError: React.Dispatch<React.SetStateAction<ErrorCollection>>];

   
// UNFINISHED - DO NOT USE!

export const getStateHandler =  <T>(key, value: string, cb: Function) => (state: Store) =>{
   const stateErr = state[key].error;  
   
   if(stateErr){ 
        cb({ [key] :{isError: true, msg: stateErr} })
         return;
   }     
// type ValueOfStateProp = keyof typeof state.getDestination; 
   for(const prop in state[key]){
      if()
      return state[key][prop];  
   }
         
}

           