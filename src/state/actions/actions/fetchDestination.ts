import { Destination } from "../../../generalTypes/apiResponse"
import { failFetch, startFetch, successFetch } from "../actionCreators"
import { DEST } from "../actionTypes"


export const startFetchDestAction = startFetch(DEST);

export const failFetchDestAction = failFetch(DEST);

export const successFetchDestAction = successFetch<Destination>(DEST)

