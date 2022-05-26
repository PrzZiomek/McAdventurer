import { FAIL_COORDINATES_LOADING, SET_COORDINATES, START_COORDINATES_LOADING } from "./actionTypes";

export const startLocationAction = () => ({
   type: START_COORDINATES_LOADING,
})

export const locationAction = (res: object = {}) => ({
   type: SET_COORDINATES,
   payload: res
})

export const failLocationAction = (err: { message: string, content: Error }) => ({
   type: FAIL_COORDINATES_LOADING,
   payload: err
})


