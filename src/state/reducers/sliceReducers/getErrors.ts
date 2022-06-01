
export type ErrorAction = { 
   type: string,
   payload: {
      message?: string;
      content: object
   } 
};

export type ErrorInitialState = {
   error: Error | null | { message?: string; content: object }, 
   isError: boolean
 };


 export const errorInitialState: ErrorInitialState = {
  error: null, 
  isError: false
};


export const getErrors = (state = errorInitialState, action: ErrorAction) => ({
   ...state,
   isError: true,
   error: action.payload
})

