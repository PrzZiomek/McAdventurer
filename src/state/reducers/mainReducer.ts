import { combineReducers } from "redux";

import { getDestination } from "./getDestination";
import { getErrors } from "./getErrors";
import { getDestinationList } from "./getDestinationList";
import { getCoordinates } from "./getCoordinates";


export const reducers = combineReducers({
   getDestination,
   getDestinationList,
   getErrors,
   getCoordinates
})

