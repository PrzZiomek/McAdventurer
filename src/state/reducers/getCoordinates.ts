import { Reducer } from "redux";
import { FAIL_COORDINATES_LOADING, SET_COORDINATES } from "../actions/actionTypes";

type Action = {
   type:string,
   payload: {
       lat: number,
       lng: number
   } 
}

type InitialState = {
    lng: number,
    lat: number
}


const initialState: InitialState = {
  lng: 0,
  lat: 0
}

export const getCoordinates: Reducer<InitialState, Action> = (state = initialState, action: Action) => {
   switch (action.type){
       case SET_COORDINATES:
           return{
               ...state,
              lat: action.payload.lat,
              lng: action.payload.lng
           };
        case FAIL_COORDINATES_LOADING:
            return {
                ...state,
                lat: 0,
                lng: 0, 
                error: action.payload
            }
       default:
           return { 
               ...state
            };
   }
}