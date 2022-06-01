import { Coordinates } from "../../../generalTypes/others";
import { failFetch, startFetch, successFetch } from "../actionCreators";
import { COORDINATES } from "../actionTypes";


export const startLocationAction = startFetch(COORDINATES);

export const locationAction = successFetch<Coordinates>(COORDINATES);

export const failLocationAction = failFetch(COORDINATES);


