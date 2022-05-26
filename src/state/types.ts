import { Destination, WikiDestination } from "../generalTypes/apiResponse";
import { getMapTheme } from "./reducers/getMapTheme";

export interface GetDestinationReducer {
   error: Error | null;
   isFetching: boolean;
   destination: WikiDestination;
   loading: boolean
}

export interface GetDestinationListReducer{
      error: Error | null;
      isFetching: boolean;
      destinations: Destination[];
      destination: Destination;
      loading: boolean
}

interface GetErrorsReducer{
   error?: Error | null, 
   isError: boolean
}

interface GetCoordinatesReducer{
      lng: number,
      lat: number
}

interface GetMapThemeReducer{
   theme: string,
}

export interface Store{
   [key: string]: GetErrorsReducer | GetDestinationReducer | GetDestinationListReducer | GetCoordinatesReducer | GetMapThemeReducer; 
   getDestination: GetDestinationReducer;
   getErrors: GetErrorsReducer,
   getDestinationList: GetDestinationListReducer,
   getCoordinates: GetCoordinatesReducer,
   getMapTheme: GetMapThemeReducer
}

export type ErrorsCollection = { isError: true; content: Error; }[] & { isError: false; }[];
export type ActionErrObj = { type: string, errors?: ErrorsCollection };

