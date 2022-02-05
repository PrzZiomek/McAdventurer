import { GET_ERROR, SET_ERROR } from "../actions/actionTypes";

const initialState = {
  error: null, 
  isError: false
};

type actionType = { 
   type: string,
   payload: {
      message?: string;
      content: object
   } 
};


export const errorReducer = (state = initialState, action: actionType) => { 
   if(action?.payload?.content){  
      return {
         ...state,
         isError: true,
         error: action.payload
      }
   }
   else{
      return {
          isError: false
      } 
   }
}
