import { useEffect, useRef } from "react"


export function useDidMountEffect(func: Function, value: [unknown]){

    const prev = useRef(false);

    useEffect(() => {
        if(prev.current) func()
        else prev.current = true
    }, value)
}