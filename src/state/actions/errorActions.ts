import { ErrorsCollection } from "../types";
import { SET_ERROR, GET_ERROR  } from "./actionTypes"


export const setErrorAction = (payload: { message?: string, content: Error }) => ({
   type: SET_ERROR,
   payload
})

export const getErrorAction = () => ({
   type: GET_ERROR,
});

export const errorMonitAction = (errors: ErrorsCollection) => ({
   type: "ERROR_MONIT",
   errors 
});
