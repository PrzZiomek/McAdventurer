import { useState, useRef, useCallback, useEffect, Dispatch, SetStateAction } from "react"


export function useStateCallback<T>(initialState: T){
    const [state, setState] = useState(initialState);
    const cbRef = useRef<Function | null>(null);

    const setStateCallback = useCallback((state: SetStateAction<T>, cb: Function) =>{
        cbRef.current = cb;
        setState(state);
    },[]);

    useEffect(() =>{
        if(cbRef.current){
           cbRef.current(state);
           cbRef.current = null;
        }
    }, [state]);

    return [state, setStateCallback] as const;
}