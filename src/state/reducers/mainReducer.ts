import { combineReducers } from "redux";

import { callApiReducer } from "./callApiReducer";
import { errorReducer } from "./errorReducer";
import { getDestinationList } from "./getDestinationList";


export const reducers = combineReducers({
   callApiReducer,
   getDestinationList,
   errorReducer
})

