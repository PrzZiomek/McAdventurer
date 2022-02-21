import { DestinationNameAndPos, WikiDestination } from "../dataModels/types";

interface GetDestinationReducer {
   error: Error | null;
   isFetching: boolean;
   destination: WikiDestination;
   loading: boolean
}

interface GetDestinationListReducer{
      error: Error | null;
      isFetching: boolean;
      destinations: DestinationNameAndPos[];
      loading: boolean
}

interface GetErrorsReducer{
   error?: Error | null, 
   isError: boolean
}

export interface Store{
   [key: string]: GetErrorsReducer | GetDestinationReducer | GetDestinationListReducer; 
   getDestination: GetDestinationReducer;
   getErrors: GetErrorsReducer,
   getDestinationList: GetDestinationListReducer
   
}