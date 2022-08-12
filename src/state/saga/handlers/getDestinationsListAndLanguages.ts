import { type } from "os";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { fetchDestinationsList } from "../../../api/fetchDestinationsList";
import { Destination, Language } from "../../../generalTypes/apiResponse";
import { failFetchDestListAction, successFetchDestListAction } from "../../actions/actions/fetchDestinationListActions";
import { successFetchLanguagesAction } from "../../actions/actions/fetchLanguagesAction";

type Response = {
   destinationList: Destination[],
   languages: Language[]
}

type OutgoingValue =  
   CallEffect<void | Response> |
   PutEffect<{ type: string; payload: Destination[] ; }> | 
   PutEffect<{ type: string; payload: Language[] ; }> | 
   PutEffect<
      { type: string;
         payload: {
            message: string;
            content: Error;
         };
      }>


export function* getDestinationsListAndLanguages(fetchData: () => Promise<void | Response>): Generator<OutgoingValue, void, Response>{

   try{
      const { destinationList, languages }: Response = yield call(fetchData); 
      yield put(successFetchDestListAction(destinationList));
      yield put(successFetchLanguagesAction(languages))
   }
   catch(err){      
      yield put(failFetchDestListAction({
         message: "error during destinations list request",
         content: err as Error
      }))
   }
 
}

export const getDestinationsListFn = () => getDestinationsListAndLanguages(fetchDestinationsList);