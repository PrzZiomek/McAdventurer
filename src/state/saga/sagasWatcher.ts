import { takeLatest, takeEvery, takeLeading } from "redux-saga/effects";

import { FETCH_START, SET_MAP_THEME } from "../actions/actionTypes";
import { getCoordinatesFn } from "./handlers/getCoordinates";
import { getDestination } from "./handlers/getDestination";
import { getClickedDestination } from "./handlers/getClickedDestination";
import { getDestinationsListFn } from "./handlers/getDestinationsListAndLanguages";
import { getMapTheme } from "./handlers/getMapTheme";


export function* sagasWatcher(){
   yield takeLatest(FETCH_START.COORDINATES, getCoordinatesFn);
   yield takeLatest(FETCH_START.DEST_LIST, getDestinationsListFn);
   yield takeLatest(SET_MAP_THEME, getMapTheme);
   yield takeLatest(FETCH_START.DEST, getDestination);
   yield takeLatest(FETCH_START.DEST_CLICKED, getClickedDestination )
}