import { combineReducers } from "redux";

import { getDestination } from "./getDestination";
import { getErrors } from "./getErrors";
import { getDestinationList } from "./getDestinationList";
import { displayErrorModal } from "./displayErrorModal";


export const reducers = combineReducers({
   getDestination,
   getDestinationList,
   getErrors,
   displayErrorModal
})

