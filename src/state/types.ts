import { DestinationNameAndPos, WikiDestination } from "../dataModels/types";

export interface Store{
   callApiReducer: {
      error: Error | null;
      isFetching: boolean;
      destination: WikiDestination;
      loading: boolean
   };
   errorReducer: {
         error?: null, 
         isError: false
   };
   getDestinationList: {
      error: Error | null;
      isFetching: boolean;
      destinations: DestinationNameAndPos[];
      loading: boolean
   }
   
}