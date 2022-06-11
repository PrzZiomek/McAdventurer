import { useEffect } from "react";

export function useDetectOutsideClick(ref: React.RefObject<HTMLDivElement>, cb: Function){

   useEffect(() => {
      const handleClick = (e: MouseEvent): void => {
         if (ref.current && !ref.current.contains(e.target as Node)) {
           cb();
         }
      }

      document.addEventListener("mousedown",(e) => handleClick(e));

      return () => {
         document.removeEventListener("mousedown",(e) => handleClick(e));
      }

   }, [ref])
}