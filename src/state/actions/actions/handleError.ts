import { ErrorsCollection } from "../../types";
import { successPayload } from "../actionCreators";
import { ERROR_MONIT, SET_ERROR } from "../actionTypes"


export const setErrorAction = successPayload<{ message?: string, content: Error}>(SET_ERROR);

export const errorMonitAction = successPayload<ErrorsCollection>(ERROR_MONIT, "errors");

