import { put, PutEffect } from "redux-saga/effects";
import { failLocationAction, locationAction } from "../../actions/actions/currentLocation";

type OutgoingValue =  Promise<unknown> | PutEffect<{type: string; payload: object;}>


export function* getCoordinates(): Generator<OutgoingValue, void, GeolocationPosition> {

  try{
    const geoPosition = yield currentLocationResponse(); 
    const lat: number = geoPosition.coords.latitude;
    const lng: number = geoPosition.coords.longitude;
    
    yield put(locationAction({lat, lng}))
  }
  catch(err){
    yield put(failLocationAction({
      message: "geolocation coordinates not obtained",
      content: err as Error
   }))    
  } 
}


export function currentLocationResponse(){
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    })
}


