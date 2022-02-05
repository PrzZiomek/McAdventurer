import { takeLatest, takeEvery } from "redux-saga/effects";

import { FETCH_START, FETCH_START_DEST_LIST, GET_ERROR, SET_ERROR } from "../actions/actionTypes";



export function* sagasWatcher(){
   yield takeEvery(FETCH_START_DEST_LIST, getDestinationsList);
}