import { Reducer } from "redux";
import { Destination } from "../../../generalTypes/apiResponse";
import { Coordinates } from "../../../generalTypes/others";
import { FETCH_FAIL, FETCH_START, FETCH_SUCCESS} from "../../actions/actionTypes";

type Data = Destination | Destination[] | Coordinates;

interface InitialState {
   data: Data | null | undefined;
   error: Error | null | undefined;
}

interface Action {
   type:string;
   payload?: Data & Error | null; 
}

const initialState: InitialState = {
   data: null,
   error: null,
} 

type FetchActionKeys = keyof typeof FETCH_START;


export const getApiData = (actionType: FetchActionKeys) => {
    return (state = initialState, action: Action) => {
        switch (action.type){
            case FETCH_START[actionType]:
                return {
                    ...state,
                    loading: true,
                };
            case FETCH_SUCCESS[actionType]:
                return {
                    ...state,
                    loading: false,
                    data: action.payload
                };
            case FETCH_FAIL[actionType]: 
                return {
                    ...state,
                    loading: false,
                    data: null, 
                    error: action.payload
                }      
            default:
                return state;
        }
     }
}


