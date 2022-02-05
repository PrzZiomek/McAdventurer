type actionType = { 
   payload: {
      message?: string;
      content: object
   } 
};

export const asyncActionCreator = (action: actionType) => async (dispatch: Function) => {
   dispatch(action); console.log("action in asyncCreator", action);  
} 
