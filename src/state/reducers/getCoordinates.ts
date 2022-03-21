import { PolandLocation } from "../../enums";
import { FETCH_FAIL, FETCH_START, FETCH_SUCCESS, SET_COORDINATES } from "../actions/actionTypes";

type Action = {
   type:string,
   payload: {
       lat: number,
       lng: number
   } 
}

const initialState = {
  lng: PolandLocation.Lng,
  lat: PolandLocation.Lat
}

export const getCoordinates = (state = initialState, action: Action) => {
   switch (action.type){
       case SET_COORDINATES:
           return{
               ...state,
              lat: action.payload.lat,
              lng: action.payload.lat
           };
       default:
           return { 
               ...state
            };
   }
}