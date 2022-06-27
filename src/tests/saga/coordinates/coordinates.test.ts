import { call, CallEffect, put, PutEffect, take, TakeEffect, takeLatest } from 'redux-saga/effects';
import { expectSaga, SagaType } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';

import { coordinates, fetchCoordinates, geoPosition } from '../../data';
import { failLocationAction, locationAction, startLocationAction } from '../../../state/actions/actions/currentLocation';
import { getApiData } from '../../../state/reducers/highOrderReducers/getApiData';
import { COORDINATES } from '../../../state/actions/actionTypes';
import { getCoordinates } from '../../../state/saga/handlers/getCoordinates';


describe("testing user coordinates state", () => {

   it("test Saga generator", () => {

      return expectSaga(() => getCoordinates(fetchCoordinates))
         .provide([
            [matchers.call.fn(fetchCoordinates), geoPosition]
         ])
         .put(locationAction({
            lat:  geoPosition.coords.latitude,
            lng: geoPosition.coords.longitude
         }))
         .dispatch(startLocationAction())
         .run();  
   });

   
   it("state from reducer when fetch is successfull", async () => {

      const initialState = {
         data: null,
         error: null
       };
       const successState = {
         data: coordinates,
         error: null,
         loading: false,
       }

      const getCoordinatesReducer = getApiData(COORDINATES);

      const { storeState } = await expectSaga(() => getCoordinates(fetchCoordinates))
         .withReducer(getCoordinatesReducer, initialState)
         .run()

      expect(storeState).toEqual(successState)

   })

   it('state when error occurs', () => {
   
      const error = new Error('geolocation coordinates not obtained');
      
      expectSaga(() => getCoordinates(fetchCoordinates))
         .provide([
            [matchers.call.fn(fetchCoordinates), throwError(error)]
         ])
         .put(failLocationAction({
            message: error.message,
            content:  error 
          }))
         .run()
   })

})
