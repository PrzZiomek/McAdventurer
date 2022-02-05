import { call, put } from "redux-saga/effects";
import { SET_ERROR } from "../../actions/actionTypes";
import { setErrorAction } from "../../actions/errorActions";


export function * handleGetDestinationsError(action: unknown, getDataFunction: Function){
   try{

      yield call(getDataFunction); throw new Error("error!!!!!1")

   }catch(err){

      yield put(setErrorAction({
         message: "error occured when fetching Destinations list from API",
         content: err
       }) 
      )
   }
}