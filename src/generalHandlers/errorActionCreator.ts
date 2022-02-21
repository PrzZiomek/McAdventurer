import { setErrorAction } from "../state/actions/errorActions";

type Action = {
      type: string,
      payload: {
         message?: string;
         content: object
      } 
   }

const errorActionCreator = (err: { message?: string, content: Error}) => {
   return async (dispatch: (arg: Action) => (Action)) => { 
      dispatch(setErrorAction(err)) 
   } 
}


export default errorActionCreator;