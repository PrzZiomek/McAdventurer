import { call, put, PutEffect } from "redux-saga/effects";
import { fetchDestinationsList } from "../../../api/fetchDestinationsList";
import { Destination } from "../../../generalTypes/apiResponse";
import { failFetchDestListAction, successFetchDestListAction } from "../../actions/actions/fetchDestinationListActions";


type OutgoingValue =  
Promise<void | Destination[]> |
PutEffect<{ type: string; payload: Destination[] ; }> | 
PutEffect<
   { type: string;
      payload: {
         message: string;
         content: Error;
      };
   }>

export function* getDestinationsList(): Generator<OutgoingValue, void, Destination[]>{

   try{
      const destList = yield fetchDestinationsList();
      yield put(successFetchDestListAction(destList))
   }
   catch(err){      
      yield put(failFetchDestListAction({
         message: "error when making destinations list request",
         content: err as Error
      }))
   }
 
}
