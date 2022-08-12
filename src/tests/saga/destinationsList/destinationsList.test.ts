import { expectSaga, SagaType } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { put, call } from 'redux-saga/effects';
import { destinations, fetchDestinations } from '../../data';
import { successFetchDestListAction, startFetchDestListAction, failFetchDestListAction } from '../../../state/actions/actions/fetchDestinationListActions';
import { getDestinationsListAndLanguages } from '../../../state/saga/handlers/getDestinationsListAndLanguages';
import { DEST_LIST } from '../../../state/actions/actionTypes';
import { getApiData } from '../../../state/reducers/highOrderReducers/getApiData';
 

describe("testing destinationsList state", () => {

   it("test Saga generator", () => {

      return expectSaga(() => getDestinationsListAndLanguages(fetchDestinations))
         .provide([
            [matchers.call.fn(fetchDestinations), destinations]
         ])
         .put(successFetchDestListAction(destinations))
         .dispatch(startFetchDestListAction())
         .run(); 
   });


   it('state from reducer when fetch is successfull', async () => {

      const initialState = {
         data: null,
         error: null,
         destination: null,
      }

      const { storeState } = await expectSaga(() => getDestinationsListAndLanguages(fetchDestinations))
         .withReducer(getApiData(DEST_LIST), initialState)
         .run()

      expect(storeState).toEqual({
         data: destinations,
         error: null,
         destination: null,
         loading: false
      })
         
   })
   
   
   it('state when error occurs', () => {
   
      const error = new Error('error when making destinations list request');
   
      return expectSaga(() => getDestinationsListAndLanguages(fetchDestinations))
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
 
