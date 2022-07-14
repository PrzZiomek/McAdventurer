import { put, PutEffect } from "redux-saga/effects";
import { fetchDestination } from "../../../api/fetchDestination";
import { Destination, DestinationDetailed } from "../../../generalTypes/apiResponse";
import { FETCH_START, FETCH_SUCCESS, SET_MAP_THEME } from "../../actions/actionTypes";
import { failFetchDestAction, successFetchDestAction } from "../../actions/actions/fetchDestination";
import { fetchClickedDestination } from "../../../api/fetchClickedDestination";


type Coordinates = { lat: number, lng: number };
/*
type OutgoingValue = 
   Promise<{ destination?: Destination, destinations?: DestinationDetailed[]  }> |
   PutEffect<{ type: string; payload: Destination | DestinationDetailed[] }> | 
   PutEffect<
      { type: string;
         payload: {
            message: string;
            content: Error;
         };
      }>

type Action = {type: typeof FETCH_START.DEST_CLICKED, coords: Coordinates};
*/
//: Generator<OutgoingValue, void, { destination?: Destination, destinations?: DestinationDetailed[] }

export function* getClickedDestination(action) {  
   try{
      const res = yield fetchClickedDestination(action.coords); console.log("res!!!!!", res);    
      const data = res.destination ? res.destination : res.destinations;
      yield put({
         type: FETCH_SUCCESS.DEST_CLICKED,
         payload: data
      })
   }
   catch(err){      
      yield put(failFetchDestAction({
         message: "error during destination request",
         content: <Error>err
      }))
   }
   
}