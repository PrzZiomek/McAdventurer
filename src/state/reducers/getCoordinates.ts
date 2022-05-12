import { Reducer } from "redux";
import { SET_COORDINATES } from "../actions/actionTypes";

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
       default:
           return { 
               ...state
            };
   }
}