import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { startLocationAction, locationAction, failLocationAction } from "../../../state/actions/actions/currentLocation";
import { coordinates, fetchCoordinates } from "../../data";

type OutgoingValue = CallEffect<typeof coordinates> | PutEffect<{type: string; payload: object;}>


export function* getCoordinatesMocked(): Generator<OutgoingValue, void, typeof coordinates> {

  try{
    const coordinates = yield call(fetchCoordinates); 
    yield put(locationAction(coordinates))
  }
  catch(err){
    yield put(failLocationAction({
      message: "geolocation coordinates not obtained",
      content: err as Error
   }))     
  } 
}


