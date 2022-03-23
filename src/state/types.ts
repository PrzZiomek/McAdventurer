import { DestinationNameAndPos, WikiDestination } from "../generalTypes/apiResponse";

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

interface GetCoordinatesReducer{
      lng: number,
      lat: number
}

export interface Store{
   [key: string]: GetErrorsReducer | GetDestinationReducer | GetDestinationListReducer | GetCoordinatesReducer; 
   getDestination: GetDestinationReducer;
   getErrors: GetErrorsReducer,
   getDestinationList: GetDestinationListReducer,
   getCoordinates: GetCoordinatesReducer
}

export type ErrorsCollection = { isError: true; content: Error; }[] & { isError: false; }[];
export type ActionErrObj = { type: string, errors?: ErrorsCollection };

