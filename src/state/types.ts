import { Destination, WikiDestination } from "../generalTypes/apiResponse";
import { getMapTheme } from "./reducers/sliceReducers/getMapTheme";

interface RequestState {
   error: Error | null;
   isFetching: boolean;
   loading: boolean
}

export interface GetDestinationReducer extends RequestState{ 
   data: WikiDestination;
}

export interface GetDestinationListReducer extends RequestState{
      data: Destination[];
}

export interface GetErrorsReducer {
   error?: Error | null, 
   isError: boolean
}

export interface GetCoordinatesReducer extends RequestState{
   data: {
      lng: number,
      lat: number
   }
}

export interface GetClickedDestination extends RequestState{
   data: Destination
}

interface GetMapThemeReducer{
   theme: string,
}

type StoreKey = GetErrorsReducer | 
   GetDestinationReducer | 
   GetDestinationListReducer | 
   GetCoordinatesReducer | 
   GetMapThemeReducer | 
   GetClickedDestination; 

export interface Store{
   [key: string]: StoreKey;
   getDestination: GetDestinationReducer;
   getErrors: GetErrorsReducer,
   getDestinationList: GetDestinationListReducer,
   getCoordinates: GetCoordinatesReducer,
   getMapTheme: GetMapThemeReducer,
   getClickedDestination: GetClickedDestination
}

export type ErrorsCollection = { isError: true; content: Error; }[] & { isError: false; }[];
export type ActionErrObj = { type: string, errors?: ErrorsCollection };

