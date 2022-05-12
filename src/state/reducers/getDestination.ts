import { Reducer } from "redux";
import { Destination } from "../../generalTypes/apiResponse";
import { FETCH_FAIL_DEST, FETCH_START_DEST, FETCH_SUCCESS_DEST } from "../actions/actionTypes";

type Action = {
   type:string,
   payload: Destination & Error | undefined
}

type InitialState = {
    destination: Destination | {} |  undefined,
    loading: boolean,
    error: Error | null | undefined
 }

 
const initialState: InitialState = {
   destination: {},
   loading: false,
   error: null
}

export const getDestination: Reducer<InitialState, Action> = (state = initialState, action: Action) => {
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