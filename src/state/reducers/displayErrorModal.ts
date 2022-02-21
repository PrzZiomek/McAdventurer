import { OPEN_MODAL } from "../actions/actionTypes"


type Action = {
   type:string,
   payload: boolean 
}

const initialState = {
   show: false
}

export const displayErrorModal = (state = initialState, action: Action) => {
   switch (action.type){
      case OPEN_MODAL: 
         return {
            show: true
         } 
      default:
         return {
            show: false
         }  
   }
}