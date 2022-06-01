import { failFetchDestAction, startFetchDestAction, successFetchDestAction } from "../state/actions/fetchDestinationActions"
import { fetchDestination } from "./fetchDestination";

/*
export const callApiForDestination = (name: string) => async (dispatch: Function) => { 
    
    dispatch(startFetchDestAction());   

    fetchDestination(name).then(
        res => dispatch(successFetchDestAction(res.destination)),
        err =>  dispatch(failFetchDestAction(err.apiRes)) 
    )
      
}
*/