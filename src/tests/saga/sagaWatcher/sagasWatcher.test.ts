import { call, CallEffect, put, PutEffect, take, TakeEffect, takeLatest } from 'redux-saga/effects';
import { expectSaga, SagaType } from 'redux-saga-test-plan';
import { sagasWatcherMocked } from './sagasWatcherMocked';
import { successFetchDestListAction, startFetchDestListAction } from '../../../state/actions/actions/fetchDestinationListActions';
import { coordinates, destinations, fetchCoordinates, fetchDestinations } from '../../data';
import { locationAction, startLocationAction } from '../../../state/actions/actions/currentLocation';


describe("testing user coordinates state", () => {

   it("test SagaWatcher generator",async () => {
      
      await expectSaga(sagasWatcherMocked)
         .call(fetchDestinations)
         .put(successFetchDestListAction(destinations))
         .dispatch(startFetchDestListAction())
         .call(fetchCoordinates)
         .put(locationAction(coordinates))
         .dispatch(startLocationAction())
         .run()
   })
})