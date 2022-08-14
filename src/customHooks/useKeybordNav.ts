import React, { useState } from "react";


export function useKeybordNav(itemsLength: number, cb: Function): [number, ((e: KeyboardEvent) => void)] {

   const [cursor, setCursor] = useState(0);
  
   const handleKeybordNavigation = (e: KeyboardEvent) => {
      if(e.key === "ArrowDown"){   
         setCursor(n => (n < itemsLength - 1 ? n + 1 : n))
      }; 
      if(e.key === "ArrowUp"){
         setCursor(n => (n > 0 ? n - 1 : 0))
      };
      if(e.key === "Enter" && cursor > 0){
         e.preventDefault();           
         cb();
      };    
   }

   return [ cursor, handleKeybordNavigation ];
};