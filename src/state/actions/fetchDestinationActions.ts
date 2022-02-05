import { FETCH_FAIL, FETCH_FAIL_DEST_LIST, FETCH_START, FETCH_START_DEST_LIST, FETCH_SUCCESS, FETCH_SUCCESS_DEST_LIST } from "./actionTypes"


export const startFetchDestAction = () => ({
   type: FETCH_START
})

export const failFetchDestAction = (res: object) => ({
   type: FETCH_FAIL,
   payload: res
})

export const successFetchDestAction = (res: object) => ({
   type: FETCH_SUCCESS,
   payload: res
})



export const startFetchDestListAction = () => ({
   type: FETCH_START_DEST_LIST
})

export const failFetchDestListAction = (err: {message: string, content: Error}) => ({
   type: FETCH_FAIL_DEST_LIST,
   payload: err
})

export const successFetchDestListAction = (res: object) => ({
   type: FETCH_SUCCESS_DEST_LIST,
   payload: res
})