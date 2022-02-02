import { WikiDestination } from "../../dataModels/types";

export interface Store{
   callApiReducer: {
      error: Error | null;
      isFetching: boolean;
      destination: WikiDestination;
      loading: boolean
   };
}