import { combineReducers } from "redux";
 
import { getErrors } from "./sliceReducers/getErrors";
import { getOneFromDestList } from "./sliceReducers/getOneFromDestList";
import { getMapTheme } from "./sliceReducers/getMapTheme";
import { getApiData } from "./highOrderReducers/getApiData";
import { getData } from "./highOrderReducers/getData";
import { COORDINATES, DEST, DEST_CLICKED, DEST_LIST, FIND_DESTINATION, LANGUAGES, SET_ERROR, SET_MAP_THEME } from "../actions/actionTypes";


export const reducers = combineReducers({
   getDestination: getApiData(DEST),
   getDestinationList: getApiData(DEST_LIST),
   getLanguages: getApiData(LANGUAGES),
   getCoordinates: getApiData(COORDINATES),
   getClickedDestination: getApiData(DEST_CLICKED),
   getNearbyBars: getApiData("BARS"),
   getErrors: getData(getErrors, SET_ERROR),
   getOneFromDestList: getData(getOneFromDestList, FIND_DESTINATION),
   getMapTheme: getData(getMapTheme, SET_MAP_THEME),
})

