import { takeLatest, takeEvery, takeLeading } from "redux-saga/effects";
import { call, put } from "redux-saga/effects";

import { FETCH_START, FETCH_START_DEST_LIST, GET_ERROR, OPEN_MODAL, SET_ERROR } from "../actions/actionTypes";
import { errorModalOpenAction } from "../actions/errorModalAction";
import { getDestinationsList } from "./handlers/getDestinationsList";


export function* sagasWatcher(){
   yield takeLeading(FETCH_START_DEST_LIST, getDestinationsList);
}