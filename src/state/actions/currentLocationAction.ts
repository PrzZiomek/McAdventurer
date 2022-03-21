import { SET_COORDINATES, START_COORDINATES_LOADING } from "./actionTypes";

export const startLocationAction = () => ({
   type: START_COORDINATES_LOADING,
})

export const locationAction = (res: object = {}) => ({
   type: SET_COORDINATES,
   payload: res
})