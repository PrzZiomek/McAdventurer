
type Action = {
   type:string,
   payload: object 
}

const initialState = {
   item: null,
   isFetching: false,
   error: null
}

export const callApiReducer = (state = initialState, action: Action) => {
   switch (action.type){
       case `FETCH_START`:
           return{
               ...state,
               loading: true,
           };
       case `FETCH_SUCCESS`:
           return{
               ...state,
               loading:false,
               item: action.payload
           };
       case `FETCH_FAIL`: 
           return{
               ...state,
               loading: false,
               item: {},
               error: action.payload
           }
       default:
           return state;
   }
}