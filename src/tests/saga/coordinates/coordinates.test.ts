import { call, CallEffect, put, PutEffect, take, TakeEffect, takeLatest } from 'redux-saga/effects';
import { expectSaga, SagaType } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';

import { coordinates, fetchCoordinates } from '../../data';
import { failLocationAction, locationAction, startLocationAction } from '../../../state/actions/currentLocationAction';
import { getCoordinatesMocked } from './getCoordinatesMocked';
import { getCoordinates } from '../../../state/reducers/getCoordinates';


describe("testing user coordinates state", () => {

   it("test Saga generator", () => {

      return expectSaga(<SagaType>getCoordinatesMocked)
         .provide([
            [call(fetchCoordinates), coordinates]
         ])
         .put(locationAction(coordinates))
         .dispatch(startLocationAction())
         .run();  
   });

   
   it("state from reducer when fetch is successfull", async () => {

      const initialState = {
         lng: 0,
         lat: 0
       }

      const { storeState } = await expectSaga(<SagaType>getCoordinatesMocked)
         .withReducer(getCoordinates, initialState)
         .run()

      expect(storeState).toEqual(coordinates)

   })

   it('state when error occurs', () => {
   
      const error = new Error('geolocation coordinates not obtained');
      
      expectSaga(getCoordinatesMocked)
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
