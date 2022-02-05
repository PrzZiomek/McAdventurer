import { SET_ERROR, GET_ERROR  } from "./actionTypes"


export const setErrorAction = (payload: { message?: string, content: object}) => ({
   type: SET_ERROR,
   payload
})

export const getErrorAction = () => ({
   type: GET_ERROR,
})