import { type } from "os";

const initialState = {
  error: null, 
  isError: false
};

type actionType = { 
   payload: {
      message?: string;
      content: object
   } 
};


export const errorReducer = (state = initialState, action: actionType) => {
   if(state.error){
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
