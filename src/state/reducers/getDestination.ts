import { FETCH_FAIL, FETCH_START, FETCH_SUCCESS } from "../actions/actionTypes";

type Action = {
   type:string,
   payload: object 
}

const initialState = {
   destination: null,
   isFetching: false,
   error: null
}

export const getDestination = (state = initialState, action: Action) => {
   switch (action.type){
       case FETCH_START:
           return{
               ...state,
               loading: true,
           };
       case FETCH_SUCCESS:
           return{
               ...state,
               loading:false,
               destination: action.payload
           };
       case FETCH_FAIL: 
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