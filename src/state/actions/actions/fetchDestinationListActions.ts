import { Destination } from "../../../generalTypes/apiResponse"
import { failFetch, startFetch, successFetch } from "../actionCreators"
import { DEST_LIST } from "../actionTypes"


export const startFetchDestListAction = startFetch(DEST_LIST);

export const failFetchDestListAction = failFetch(DEST_LIST);

export const successFetchDestListAction = successFetch<Destination[]>(DEST_LIST);
