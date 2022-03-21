import { put } from "redux-saga/effects";
import { locationAction } from "../../actions/currentLocationAction";


export function* getCoordinates(): Generator {

  const pos = yield currentLocationResponse() 

  const geoPosition = pos as GeolocationPosition;

  const lat: number = geoPosition.coords.latitude;
  const lng: number = geoPosition.coords.longitude;
  
  yield put(locationAction({lat, lng}))
}


function currentLocationResponse(){
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    })
}