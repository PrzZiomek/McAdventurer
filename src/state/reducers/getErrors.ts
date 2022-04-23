import { SET_ERROR } from "../actions/actionTypes";

type Action = { 
   type: string,
   payload: {
      message?: string;
      content: object
   } 
};

type InitialState = {
   error: Error | null, 
   isError: boolean
 };


const initialState: InitialState = {
  error: null, 
  isError: false
};

export const getErrors = (state = initialState, action: Action) => {
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

