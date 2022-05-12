import { Reducer } from "redux";
import { Destination } from "../../generalTypes/apiResponse";
import { FIND_DESTINATION } from "../actions/actionTypes";


type Action = {
   type:string,
   payload: string
}

type InitialState = {
    destination: Destination | null | undefined;
    destinations?: Destination[] | undefined;
 }

 
const initialState: InitialState = {
   destination: null,
}


export const getOneFromDestList: Reducer<InitialState, Action> = (state = initialState, action: Action) => {
   switch(action.type){
      case FIND_DESTINATION:  
         if(state.destinations){
            return { 
               destination: state.destinations.find(dest => dest.name.toLowerCase()  === action.payload.toLowerCase())
            }
         }
      default:
         return state;
   }
}