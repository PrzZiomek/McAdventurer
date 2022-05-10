import {  useState,  ChangeEvent, MouseEvent, FC, KeyboardEvent, Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { I } from "../../worldMap/models/types/componentsInterfaces";
import { DestinationsHintsList } from "./destinationsHintsList";


export const DestinationsHints: FC<I.DestinationsHints> = (props) => {

   const handleHintClick = (e: MouseEvent<HTMLButtonElement>): void => {
      const button = e.currentTarget;
      const destinationName = button.querySelector("span")!.textContent; 
      if(!destinationName) return;
      props.setInputTypedValue(destinationName);
      props.setFiltered([]);
  }

  const showHints = (): JSX.Element | null =>  props.filtered.length ? 
      <DestinationsHintsList
          handleClick={handleHintClick} 
          destinations={props.filtered} 
          showHints={false}  
      /> : null; 

   return(
     <>
         {showHints()}
      </>
   )
}
