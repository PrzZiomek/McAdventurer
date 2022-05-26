import { Reducer } from "redux";
import { SET_MAP_THEME } from "../actions/actionTypes";

type Action = { 
   type: string,
   payload: string
};

type InitialState = {
   theme: string | null
 };


const initialState: InitialState = {
   theme: "normal.day"
};

export const getMapTheme: Reducer<InitialState, Action> = (state = initialState, action: Action) => {
   switch (action.type){
      case SET_MAP_THEME: 
         return {
            ...state,
            theme: action.payload
         }
      default: 
         return state;
   }
}

