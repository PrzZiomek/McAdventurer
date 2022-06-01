import { put, PutEffect } from "redux-saga/effects";
import { fetchDestination } from "../../../api/fetchDestination";
import { Destination } from "../../../generalTypes/apiResponse";
import { FETCH_START, SET_MAP_THEME } from "../../actions/actionTypes";
import { failFetchDestAction, successFetchDestAction } from "../../actions/actions/fetchDestination";


type OutgoingValue = 
   Promise<{ destination: Destination | undefined }> |
   PutEffect<{ type: string; payload: Destination }> | 
   PutEffect<
      { type: string;
         payload: {
            message: string;
            content: Error;
         };
      }>

type Action = { name: string, type: typeof FETCH_START.DEST };


export function* getDestination( action: Action): Generator<OutgoingValue, void, { destination: Destination }> {
   
   try{
      const res = yield fetchDestination(action.name);
      yield put(successFetchDestAction(res.destination))
   }
   catch(err){      
      yield put(failFetchDestAction({
         message: "error when making destinations list request",
         content: <Error>err
      }))
   }
   
}