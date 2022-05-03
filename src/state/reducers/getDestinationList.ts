import { DestinationNameAndPos } from "../../generalTypes/apiResponse";
import { FETCH_FAIL_DEST_LIST, FETCH_START_DEST_LIST, FETCH_SUCCESS_DEST_LIST } from "../actions/actionTypes";

type Action = {
   type:string,
   payload: object | string
}

type InitialState = {
  destinations: DestinationNameAndPos[],
   error: Error | null,
   destination: DestinationNameAndPos | null
}

const initialState: InitialState = {
   destinations: [],
   error: null,
   destination: null
}

export const getDestinationList = (state = initialState, action: Action) => {
   switch (action.type){
       case FETCH_START_DEST_LIST:
           return {
               ...state,
               loading: true,
           };
       case FETCH_SUCCESS_DEST_LIST:
           return {
               ...state,
               loading:false,
               destinations: action.payload
           };
       case FETCH_FAIL_DEST_LIST: 
           return {
               ...state,
               loading: false,
               destinations: {},
               error: action.payload
           }
        case "FIND_DESTINATION": console.log("payload", action.payload);      
             return { 
                destination: state.destinations.find(dest => dest.name.toLowerCase  === action.payload.toLowerCase)
           }
       default:
           return state;
   }
}