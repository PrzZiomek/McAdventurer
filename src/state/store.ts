import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core";

import { reducers } from "./reducers/mainReducer";
import { sagasWatcher } from "./saga/sagasWatcher";
import { errorReporter } from "./middlewares/errorReporter";


const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducers, applyMiddleware(
   errorReporter,
   sagaMiddleware,
   thunk,
))


sagaMiddleware.run(sagasWatcher)

