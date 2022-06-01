import { takeLatest } from 'redux-saga/effects';

import { FETCH_START } from '../../../state/actions/actionTypes';
import { getDestinationsListMocked } from "../destinationsList/getDestinationsListMocked";
import { getCoordinates } from "../../../state/saga/handlers/getCoordinates";
import { getCoordinatesMocked } from '../coordinates/getCoordinatesMocked';

 
export function* sagasWatcherMocked(){
   yield takeLatest(FETCH_START.DEST_LIST, getDestinationsListMocked);
   yield takeLatest(FETCH_START.COORDINATES, getCoordinatesMocked)
}