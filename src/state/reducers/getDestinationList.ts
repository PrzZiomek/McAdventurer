import { Reducer } from "redux";
import { Destination } from "../../generalTypes/apiResponse";
import { FETCH_FAIL_DEST_LIST, FETCH_START_DEST_LIST, FETCH_SUCCESS_DEST_LIST, FIND_DESTINATION } from "../actions/actionTypes";

type Action = {
   type:string;
   payload?: Destination[] & Error | undefined
}

type InitialState = {
   destinations: Destination[] | undefined;
   error: Error | null | undefined;
   destination: Destination | null | undefined;
}

const initialState: InitialState = {
   destinations: [],
   error: null,
   destination: null,
}

export const getDestinationList: Reducer<InitialState, Action> = (state = initialState, action: Action) => {
   switch (action.type){
       case FETCH_START_DEST_LIST:
           return {
               ...state,
               loading: true,
           };
       case FETCH_SUCCESS_DEST_LIST:
           return {
               ...state,
               loading: false,
               destinations: action.payload
           };
       case FETCH_FAIL_DEST_LIST: 
           return {
               ...state,
               loading: false,
               destinations: [], 
               error: action.payload
           }
           
       default:
           return state;
   }
}

