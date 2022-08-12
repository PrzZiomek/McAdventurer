import {  MouseEvent, FC, Dispatch, SetStateAction, useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useDetectOutsideClick } from "../../../customHooks/useDetectOutsideClick";
import { Destination } from "../../../generalTypes/apiResponse";
import { useSelector } from "react-redux";
import { Store } from "../../../state/types";
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
   const items = [...props.cachedValues, ...props.filtered];

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

  const languages: Destination[] | undefined = useSelector((state: Store) => {  
      if(state.getDestinationList.loading !== false) return;     
      return state.getLanguages.data;                                   
   }); 

  const languagesList = useMemo(
      () => items.map(item => languages?.find((lang) => { 
               const name = lang.name.trim().toLowerCase();
               const country = item.country.trim().toLowerCase(); 
               if(name.slice(0, 3) === country.slice(0, 3)){        
                  return lang.code;
               }
  })), [items.length, languages?.length]); 

  const showHintList = (): JSX.Element | null => props.showCachedList ? 
      <DestinationsHintsList
          handleClick={handleHintClick} 
          showHints={false}  
          languages={languagesList}
          items={items}
      /> : null;

   return(
     <div ref={menuRef}>
         {showHintList()}
      </div>
   )
}

