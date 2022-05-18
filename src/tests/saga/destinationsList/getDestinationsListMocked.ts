import { call, CallEffect, put, PutEffect, take, TakeEffect, takeLatest } from 'redux-saga/effects';

import { Destination } from '../../../generalTypes/apiResponse';
import { fetchDestinations } from '../../data';
import { successFetchDestListAction, startFetchDestListAction, failFetchDestListAction } from '../../../state/actions/fetchDestinationActions';


type OutgoingValue = 
CallEffect<Destination[]> | 
PutEffect<{ type: string;  payload: Destination[]; }> | 
PutEffect<{ type: string;
   payload: {
      message: string;
      content: Error;
   };
}>


export function* getDestinationsListMocked(): Generator< OutgoingValue, void, Destination[]>{
   try{
      const destinations = yield call(fetchDestinations);
      yield put(successFetchDestListAction(destinations))      
   }
   catch(err){
      yield put(failFetchDestListAction({
         message: "error when making destinations list request",
         content: <Error>err  
         })
      )
   }
}


