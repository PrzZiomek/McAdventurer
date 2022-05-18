import { expectSaga, SagaType } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { getDestinationList } from '../../../state/reducers/getDestinationList';
import { getDestinationsListMocked } from './getDestinationsListMocked';
import { put, call } from 'redux-saga/effects';
import { destinations, fetchDestinations } from '../../data';
import { successFetchDestListAction, startFetchDestListAction, failFetchDestListAction } from '../../../state/actions/fetchDestinationActions';
 

describe("testing destinationsList state", () => {


   it("test Saga generator", () => {

      return expectSaga(<SagaType>getDestinationsListMocked, fetchDestinations)
         .provide([
            [call(fetchDestinations), destinations]
         ])
         .put(successFetchDestListAction(destinations))
         .dispatch(startFetchDestListAction())
         .run(); 
   });


   it('state from reducer when fetch is successfull', async () => {

      const initialState = {
         destinations: [],
         error: null,
         destination: null,
      }

      const { storeState } = await expectSaga(getDestinationsListMocked)
         .withReducer(getDestinationList, initialState)
         .run()

      expect(storeState).toEqual({
         destinations: destinations,
         error: null,
         destination: null,
         loading: false
      })
         
   })
   
   
   it('state when error occurs', () => {
   
      const error = new Error('error when making destinations list request');
   
      return expectSaga(<SagaType>getDestinationsListMocked, fetchDestinations)
         .provide([
            [call(fetchDestinations), throwError(error)]
         ])
         .put(failFetchDestListAction({
               message: error.message,
               content:  error 
         }))
         .run(); 
   })

})
 
