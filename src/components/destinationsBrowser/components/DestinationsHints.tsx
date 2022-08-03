import {  MouseEvent, FC, Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import { useDetectOutsideClick } from "../../../customHooks/useDetectOutsideClick";
import { Destination } from "../../../generalTypes/apiResponse";
import { DestinationsHintsList } from "./destinationsHintsList";


export interface IDestinationsHints {
   setInputTypedValue: Dispatch<SetStateAction<string>>;
   setFiltered: Dispatch<SetStateAction<Destination[]>>; 
   filtered: Destination[];
   cachedValues: {name: string, country: string}[];
   showCachedList: boolean;
   setShowCachedList: Dispatch<SetStateAction<boolean>>;
 }


export const DestinationsHints: FC<IDestinationsHints> = (props) => {

   const menuRef = useRef<HTMLDivElement>(null);
   useDetectOutsideClick(menuRef, () => props.setShowCachedList(false));

   useEffect(() => {
      if(!props.showCachedList) return;
      props.setShowCachedList(true)
    }, [props.showCachedList])

   const handleHintClick = (e: MouseEvent<HTMLButtonElement>): void => {
      const button = e.currentTarget;
      const destinationName = button.querySelector("span")!.textContent; 
      if(!destinationName) return;
      props.setInputTypedValue(destinationName);
     props.setShowCachedList(false)
  }; 

  const showHintList = (): JSX.Element | null => props.showCachedList && props.showCachedList ? 
      <DestinationsHintsList
          handleClick={handleHintClick} 
          destinations={props.filtered} 
          cachedDestinations={props.cachedValues}
          showHints={false}  
      /> : null;


   return(
     <div ref={menuRef}>
         {showHintList()}
      </div>
   )
}

