import { takeLatest } from 'redux-saga/effects';

import { FETCH_START } from '../../../state/actions/actionTypes';
import { getCoordinates } from "../../../state/saga/handlers/getCoordinates";
import { fetchCoordinates, fetchDestinations } from '../../data';
import { getDestinationsList } from '../../../state/saga/handlers/getDestinationsList';

 
export function* sagasWatcherMocked(){
   yield takeLatest(FETCH_START.DEST_LIST, () => getDestinationsList(fetchDestinations));
   yield takeLatest(FETCH_START.COORDINATES,() => getCoordinates(fetchCoordinates))
}