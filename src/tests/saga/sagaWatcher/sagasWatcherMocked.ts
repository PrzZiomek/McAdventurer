import { takeLatest } from 'redux-saga/effects';

import { FETCH_FAIL_DEST_LIST, FETCH_START_DEST_LIST, FETCH_SUCCESS_DEST_LIST, SET_COORDINATES, START_COORDINATES_LOADING } from '../../../state/actions/actionTypes';
import { getDestinationsListMocked } from "../destinationsList/getDestinationsListMocked";
import { getCoordinates } from "../../../state/saga/handlers/getCoordinates";
import { getCoordinatesMocked } from '../coordinates/getCoordinatesMocked';

 
export function* sagasWatcherMocked(){
   yield takeLatest(FETCH_START_DEST_LIST, getDestinationsListMocked);
   yield takeLatest(START_COORDINATES_LOADING, getCoordinatesMocked)
}