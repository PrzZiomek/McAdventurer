import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core";

import { reducers } from "./reducers/mainReducer";
import { sagasWatcher } from "./saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducers, applyMiddleware(
   sagaMiddleware,
   thunk
))

sagaMiddleware.run(sagasWatcher)
