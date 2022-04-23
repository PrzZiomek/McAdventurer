import { DestinationNameAndPos } from "../../generalTypes/apiResponse";
import { FETCH_FAIL_DEST, FETCH_START_DEST, FETCH_SUCCESS_DEST } from "../actions/actionTypes";

type Action = {
   type:string,
   payload: object 
}

type InitialState = {
    destination: DestinationNameAndPos | null,
    isFetching: boolean,
    error: Error | null
 }

 
const initialState: InitialState = {
   destination: null,
   isFetching: false,
   error: null
}

export const getDestination = (state = initialState, action: Action) => {
   switch (action.type){
       case FETCH_START_DEST:
           return{
               ...state,
               loading: true,
           };
       case FETCH_SUCCESS_DEST:
           return{
               ...state,
               loading:false,
               destination: action.payload
           };
       case FETCH_FAIL_DEST: 
           return{
               ...state,
               loading: false,
               destination: {},
               error: action.payload
           }
       default:
           return state;
   }
}