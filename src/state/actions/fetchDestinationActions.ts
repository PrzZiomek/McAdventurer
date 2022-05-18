import { Destination } from "../../generalTypes/apiResponse"
import { 
   FETCH_FAIL_DEST,
   FETCH_FAIL_DEST_LIST,
   FETCH_START_DEST,
   FETCH_START_DEST_LIST,
   FETCH_SUCCESS_DEST,
   FETCH_SUCCESS_DEST_LIST } from "./actionTypes"


export const startFetchDestAction = () => ({
   type: FETCH_START_DEST
})

export const failFetchDestAction = (res: object) => ({
   type: FETCH_FAIL_DEST,
   payload: res
})

export const successFetchDestAction = (res: object) => ({
   type: FETCH_SUCCESS_DEST,
   payload: res
})



export const startFetchDestListAction = () => ({
   type: FETCH_START_DEST_LIST
})

export const failFetchDestListAction = (err: { message: string, content: Error }) => ({
   type: FETCH_FAIL_DEST_LIST,
   payload: err
})

export const successFetchDestListAction = (res: Destination[]) => ({
   type: FETCH_SUCCESS_DEST_LIST,
   payload: res
})
