import React, { useEffect, useState } from "react";


export function useKeyPress(targetKey: string, ref: React.RefObject<HTMLElement>) {

   const [isKeyPressed, setIsKeyPressed] = useState(false);
   
   const downHandler = (e: KeyboardEvent): void => {
      if(e.key === targetKey) setIsKeyPressed(true);
   };

   const upHandler = (e: KeyboardEvent): void => {
      if(e.key === targetKey) setIsKeyPressed(false);
   };
 
   useEffect(() => {
      ref.current?.addEventListener("keydown", downHandler);
      ref.current?.addEventListener("keyup", upHandler); 

      return () => {
          ref.current?.removeEventListener("keydown", downHandler);
          ref.current?.removeEventListener("keyup", upHandler);
      };
  });

  return isKeyPressed;
}

