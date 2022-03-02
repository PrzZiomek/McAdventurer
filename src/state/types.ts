import { DestinationNameAndPos, WikiDestination } from "../dataModels/types";

export interface GetDestinationReducer {
   error: Error | null;
   isFetching: boolean;
   destination: WikiDestination;
   loading: boolean
}

export interface GetDestinationListReducer{
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

export enum StoreProps {
   GetDestination = "getDestination",
   GetErrors = "getErrors",
   GetDestinationList = "getDestinationList"
}