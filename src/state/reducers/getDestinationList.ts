import { FETCH_FAIL_DEST_LIST, FETCH_START_DEST_LIST, FETCH_SUCCESS_DEST_LIST } from "../actions/actionTypes";

type Action = {
   type:string,
   payload: object 
}

const initialState = {
   destinations: null,
   error: null
}

export const getDestinationList = (state = initialState, action: Action) => {
   switch (action.type){
       case FETCH_START_DEST_LIST:
           return{
               ...state,
               loading: true,
           };
       case FETCH_SUCCESS_DEST_LIST:
           return{
               ...state,
               loading:false,
               destinatios: action.payload
           };
       case FETCH_FAIL_DEST_LIST: 
           return{
               ...state,
               loading: false,
               destinations: {},
               error: action.payload
           }
       default:
           return state;
   }
}