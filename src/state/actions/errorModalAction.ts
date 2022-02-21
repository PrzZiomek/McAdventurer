import { CLOSE_MODAL, OPEN_MODAL } from "./actionTypes";


export const errorModalOpenAction = () => ({
   type: OPEN_MODAL,
})

export const errorModalCloseAction = () => ({
   type: CLOSE_MODAL,
})