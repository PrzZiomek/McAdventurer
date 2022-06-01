import { FIND_DESTINATION, SET_ERROR, SET_MAP_THEME } from "../../actions/actionTypes";
import { ErrorInitialState, errorInitialState } from "../sliceReducers/getErrors";
import { MapThemeInitialState, mapThemeInitialState } from "../sliceReducers/getMapTheme";
import { OneDestInitialState, oneDestInitialState } from "../sliceReducers/getOneFromDestList";

type Action = {
   type:string,
   payload: string
}

type Keys = typeof SET_MAP_THEME | typeof FIND_DESTINATION | typeof SET_ERROR;

type InitialState = {
   [key in Keys]: ErrorInitialState | OneDestInitialState | MapThemeInitialState
}

const initialStateOptions: InitialState = {
   SET_ERROR: errorInitialState,
   FIND_DESTINATION: oneDestInitialState,
   SET_MAP_THEME: mapThemeInitialState
}


export const getData = (reducer: Function, actionType: Keys) => { 
   
   const initialState = initialStateOptions[actionType];
   
   return (state = initialState, action: Action) => { 
      switch (action.type){
         case actionType: 
           return reducer(state, action)
         default: 
            return state; 
      }
   }
}
