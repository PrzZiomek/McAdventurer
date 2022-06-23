import {  MouseEvent, FC, Dispatch, SetStateAction } from "react";
import { Destination } from "../../../generalTypes/apiResponse";
import { DestinationsHintsList } from "./destinationsHintsList";


export interface IDestinationsHints {
   setInputTypedValue: Dispatch<SetStateAction<string>>;
   setFiltered: Dispatch<SetStateAction<Destination[]>>; 
   filtered: Destination[];
 }


export const DestinationsHints: FC<IDestinationsHints> = (props) => {

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
