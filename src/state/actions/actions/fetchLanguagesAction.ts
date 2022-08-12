import { Language } from "../../../generalTypes/apiResponse"
import { failFetch, startFetch, successFetch } from "../actionCreators"
import { LANGUAGES } from "../actionTypes"


export const startFetchLanguagesAction = startFetch(LANGUAGES);

export const failFetchLanguagesAction = failFetch(LANGUAGES);

export const successFetchLanguagesAction = successFetch<Language[]>(LANGUAGES);
