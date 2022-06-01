import { put, PutEffect } from "redux-saga/effects";
import { SET_MAP_THEME } from "../../actions/actionTypes";


export function* getMapTheme( action: { payload: string, type: typeof SET_MAP_THEME }) {

   /** for the testing needs 
      console.log("current Theme!: ", action.payload); 
   */
}