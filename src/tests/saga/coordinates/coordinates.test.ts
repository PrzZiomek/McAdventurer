import { call, CallEffect, put, PutEffect, take, TakeEffect, takeLatest } from 'redux-saga/effects';
import { expectSaga, SagaType } from 'redux-saga-test-plan';

 import { coordinates, fetchCoordinates } from '../../data';
import { locationAction, startLocationAction } from '../../../state/actions/currentLocationAction';
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

   /**  to implement when the functionality will be made */
   it('state when error occurs', () => {
   
      const error = new Error('location coordinates no obtained');

   })

})
