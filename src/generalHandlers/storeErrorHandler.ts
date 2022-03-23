import { Store } from "../state/types";
import { errorCollector } from "../utils/errorCollector";


export const storeErrorHandler = (keys: string[]) => (store: Store) => { 

   return keys.reduce(errorCollector(store), []) 
}