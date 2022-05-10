import { call, put } from "redux-saga/effects";
import { fetchDestinationsList } from "../../../api/fetchDestinationsList";
import { DestinationNameAndPos } from "../../../generalTypes/apiResponse";
import { failFetchDestListAction, successFetchDestListAction } from "../../actions/fetchDestinationActions";



export function* getDestinationsList(){

   try{
      const destList: Promise<void | DestinationNameAndPos[]> = yield fetchDestinationsList();
      yield put(successFetchDestListAction(destList))
   }
   catch(err){      
      yield put(failFetchDestListAction({
         message: "error when making destinations list request",
         content: err as Error
      }))
   }
 
}
