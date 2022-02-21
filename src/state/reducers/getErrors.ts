import { SET_ERROR } from "../actions/actionTypes";

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

export const getErrors = (state = initialState, action: actionType) => {
   switch (action.type){
      case SET_ERROR: 
         return {
            ...state,
            isError: true,
            error: action.payload
         }
      default: 
         return state;
   }
}

/*
export const getErrors = (state = initialState, action: actionType) => { 
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

*/