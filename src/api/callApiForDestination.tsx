import { failFetchDestAction, startFetchDestAction, successFetchDestAction } from "../state/actions/fetchDestinations"
import { fetchDestination } from "./fetchDestination";


export const callApiForDestination = (name: string) => async (dispatch: Function) => { 
    
    dispatch(startFetchDestAction());
 
    fetchDestination(name).then(
        res => dispatch(successFetchDestAction(res)),
        err => dispatch(failFetchDestAction(err))
    )
      
}

