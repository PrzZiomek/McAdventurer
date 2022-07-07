import {  MouseEvent, FC, Dispatch, SetStateAction, useState } from "react";
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

   const handleHintClick = (e: MouseEvent<HTMLButtonElement>): void => {
      const button = e.currentTarget;
      const destinationName = button.querySelector("span")!.textContent; 
      if(!destinationName) return;
      props.setInputTypedValue(destinationName);
      props.setFiltered([]);
  }; 

  const showHintList = (): JSX.Element | null =>  props.filtered.length ? 
      <DestinationsHintsList
          handleClick={handleHintClick} 
          destinations={props.filtered} 
          showHints={false}  
      /> : null;

   const hasCached = props.cachedValues.some(val => val.name);
   console.log("props.cachedValues", props.cachedValues);
   console.log("hasCached && props.showCachedList", {hasCached , show: props.showCachedList});
   

   const showCachedList = (): JSX.Element | null => hasCached && props.showCachedList ? 
      <DestinationsHintsList
         handleClick={handleHintClick} 
         destinations={props.cachedValues} 
         showHints={false}  
      /> : null; 

   return(
     <>
         {showCachedList()}
         {showHintList()}
      </>
   )
}
