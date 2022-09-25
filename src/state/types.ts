import { Destination, Local, WikiDestination } from "../generalTypes/apiResponse";


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

export interface GetNearbyBars extends RequestState{
   data: Local[]
}


interface GetMapThemeReducer{
   theme: string,
}

type StoreKey = GetErrorsReducer | 
   GetDestinationReducer | 
   GetDestinationListReducer | 
   GetCoordinatesReducer | 
   GetMapThemeReducer | 
   GetClickedDestination |
   GetNearbyBars; 

export interface Store{
   [key: string]: StoreKey;
   getDestination: GetDestinationReducer;
   getErrors: GetErrorsReducer;
   getDestinationList: GetDestinationListReducer;
   getCoordinates: GetCoordinatesReducer;
   getMapTheme: GetMapThemeReducer;
   getClickedDestination: GetClickedDestination;
   getNearbyBars: GetNearbyBars;
}

export type ErrorsCollection = { isError: true; content: Error; }[] & { isError: false; }[];
export type ActionErrObj = { type: string, errors?: ErrorsCollection };

