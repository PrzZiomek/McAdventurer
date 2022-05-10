import { assert } from "console";
import { put } from "redux-saga/effects";
import { locationAction } from "../../actions/currentLocationAction";


export function* getCoordinates(): Generator {

  try{
    const pos = yield currentLocationResponse() 
    const geoPosition = pos as GeolocationPosition;
  
    const lat: number = geoPosition.coords.latitude;
    const lng: number = geoPosition.coords.longitude;
    
    yield put(locationAction({lat, lng}))
  }
  catch(err){
      console.log("error when getting user geolocation: ", err);     
  } 
}


function currentLocationResponse(){
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    })
}


assert.