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
 }


export const DestinationsHints: FC<IDestinationsHints> = (props) => {

   const [openList, setOpenList] = useState(true);
   const menuRef = useRef<HTMLDivElement>(null);
   useDetectOutsideClick(menuRef, () => setOpenList(false));

   useEffect(() => {
      if(!props.showCachedList) return;
      setOpenList(true)
    }, [props.showCachedList])

   const handleHintClick = (e: MouseEvent<HTMLButtonElement>): void => {
      const button = e.currentTarget;
      const destinationName = button.querySelector("span")!.textContent; 
      if(!destinationName) return;
      props.setInputTypedValue(destinationName);
     setOpenList(!openList)
  }; 

  const showHintList = (): JSX.Element | null => openList && props.filtered.length ? 
      <DestinationsHintsList
          handleClick={handleHintClick} 
          destinations={props.filtered} 
          showHints={false}  
      /> : null;

   const showCachedList = (): JSX.Element | null =>  openList && props.showCachedList ? 
      <DestinationsHintsList
         handleClick={handleHintClick} 
         destinations={props.cachedValues} 
         showHints={false}  
      /> : null; 

   return(
     <div ref={menuRef}>
         {showCachedList()}
         {showHintList()}
      </div>
   )
}
