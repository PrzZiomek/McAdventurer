import { takeLatest, takeEvery, takeLeading } from "redux-saga/effects";

import { FETCH_START_DEST_LIST, GET_ERROR, OPEN_MODAL, SET_COORDINATES, SET_ERROR, START_COORDINATES_LOADING } from "../actions/actionTypes";
import { getCoordinates } from "./handlers/getCoordinates";
import { getDestinationsList } from "./handlers/getDestinationsList";


export function* sagasWatcher(){
   yield takeLatest(START_COORDINATES_LOADING, getCoordinates)
   yield takeLatest(FETCH_START_DEST_LIST, getDestinationsList);
}