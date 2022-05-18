import { put, PutEffect } from "redux-saga/effects";
import { locationAction } from "../../actions/currentLocationAction";

type OutgoingValue =  Promise<unknown> | PutEffect<{type: string; payload: object;}>


export function* getCoordinates(): Generator<OutgoingValue, void, GeolocationPosition> {

  try{
    const geoPosition = yield currentLocationResponse(); 
    const lat: number = geoPosition.coords.latitude;
    const lng: number = geoPosition.coords.longitude;
    
    yield put(locationAction({lat, lng}))
  }
  catch(err){
      console.log("error when getting user geolocation: ", err);     
  } 
}


export function currentLocationResponse(){
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    })
}


