import { put, PutEffect, select, SelectEffectDescriptor, SimpleEffect } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";

import { Local } from "../../../generalTypes/apiResponse";
import { FETCH_FAIL, FETCH_START, FETCH_SUCCESS, SET_MAP_THEME } from "../../actions/actionTypes";
import { Coordinates } from "../../../generalTypes/others";
import { Store } from "../../types";


type  ApiResponse = { 
   data: { 
      results: Local[] 
   };
};

type OutgoingValue = 
   SimpleEffect<"SELECT", SelectEffectDescriptor> |
   Promise<void | AxiosResponse<ApiResponse>> |
   PutEffect<{ type: string; payload: Local[] }> | 
   PutEffect<
      { type: string;
         payload: {
            message: string;
            content: Error;
         };
      }>

type Action = {
    type: typeof FETCH_START.BARS;
    isMapClicked: boolean;
    place: {
      query: string;
      limit: number;
      radius: string;
    }; 
};

type NextValue = ApiResponse & Coordinates;


export function* getBarsNearby(action: Action): Generator<OutgoingValue, void, NextValue> {  

      try{    
         const { query, limit = 20, radius = 10000 } = action.place; 
         let baseUrl = 'https://api.tomtom.com/search/2/poiSearch'; 
         const coords: Coordinates = yield select((state: Store) => {       
            if(action.isMapClicked) return state.getClickedDestination.data.coordinates;
            return state.getDestination.data.coordinates;
         });
         let queryString = `limit=${limit}&lat=${coords?.lat}&lon=${coords?.lng}&radius=${radius}&key=3HzsXWuQLWDL2hbJw9IJKNpwXpcx4NJG`;
         
         let response = yield axios.get<ApiResponse>(`${baseUrl}/${query}.json?${queryString}`); console.log("response in saga gen", response);

         yield put({
            type: FETCH_SUCCESS.BARS,
            payload: response.data.results
        })      
      }
      catch(err){    

         yield put({
            type: FETCH_FAIL.BARS,
            payload:{
               message: "error during destination request",
               content: <Error>err
            }
         })
      }

}
