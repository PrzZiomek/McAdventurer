import { combineReducers } from "redux";
 
import { getErrors } from "./sliceReducers/getErrors";
import { getOneFromDestList } from "./sliceReducers/getOneFromDestList";
import { getMapTheme } from "./sliceReducers/getMapTheme";
import { getApiData } from "./highOrderReducers/getApiData";
import { Destination } from "../../generalTypes/apiResponse";
import { Coordinates } from "../../generalTypes/others";
import { getData } from "./highOrderReducers/getData";
import { COORDINATES, DEST, DEST_CLICKED, DEST_LIST, FIND_DESTINATION, SET_ERROR, SET_MAP_THEME } from "../actions/actionTypes";


export const reducers = combineReducers({
   getDestination: getApiData(DEST),
   getDestinationList: getApiData(DEST_LIST),
   getCoordinates: getApiData(COORDINATES),
   getClickedDestination: getApiData(DEST_CLICKED),
   getErrors: getData(getErrors, SET_ERROR),
   getOneFromDestList: getData(getOneFromDestList, FIND_DESTINATION),
   getMapTheme: getData(getMapTheme, SET_MAP_THEME),
})

