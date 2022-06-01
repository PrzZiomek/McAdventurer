
import { Destination } from "../../../generalTypes/apiResponse";


export type OneDestAction = {
   type:string,
   payload: string
}

export type OneDestInitialState = {
    destination: Destination | null | undefined;
    destinations?: Destination[] | undefined;
 }

 
 export const oneDestInitialState: OneDestInitialState = {
   destination: null,
}

export const getOneFromDestList = (state = oneDestInitialState, action: OneDestAction) => ({
   destination: state.destinations && state.destinations.find(dest => dest.name.toLowerCase()  === action.payload.toLowerCase())
})

