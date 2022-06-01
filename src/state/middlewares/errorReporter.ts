import { log } from 'console';
import type { Dispatch, AnyAction } from 'redux'

import { ERROR_MONIT } from '../actions/actionTypes';
import { ErrorsCollection, Store } from "../types";
import { ActionErrObj } from "../types";


export interface MiddlewareAPI<T, U extends AnyAction> {
  dispatch: Dispatch<U>
  getState(): T
};

export type Middleware<T, U extends AnyAction> =
  (store: MiddlewareAPI<T, U>) =>
  (next: Dispatch<U>) =>
  (action: U) => ReturnType<Dispatch<U>>
;

export const errorReporter: Middleware<Store, object & {type: string}> = (_) => (next) => (action) => {
   try { 
      if(action.type === ERROR_MONIT){ console.log("action", action);
      
         const errorsAction = (action as ActionErrObj).errors as ErrorsCollection;
         const errors = errorsAction.filter(errObj => errObj.isError);
         console.log("list of errors: ", errors);
      }
      return next(action)
    } 
    catch (err) {
      console.error('error caught before reaching a Reducer!: ', err) 
      return action;
    }
};
