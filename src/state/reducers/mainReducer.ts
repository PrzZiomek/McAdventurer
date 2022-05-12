import { combineReducers } from "redux";

import { getDestination } from "./getDestination";
import { getErrors } from "./getErrors";
import { getDestinationList } from "./getDestinationList";
import { getCoordinates } from "./getCoordinates";
import { getOneFromDestList } from "./getOneFromDestList";



export const reducers = combineReducers({
   getDestination,
   getDestinationList,
   getErrors,
   getCoordinates,
   getOneFromDestList
})

