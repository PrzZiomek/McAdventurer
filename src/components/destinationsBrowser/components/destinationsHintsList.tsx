import { MouseEvent, FC, useRef, useState, cloneElement, Children, isValidElement } from "react";
import { Destination } from "../../../generalTypes/apiResponse";
import { HintsButtonStyled } from "../styles/hintsButtonStyled";
import { HintsListStyles } from "../styles/hintsListStyles";

interface DestinationsHintsListProps {
   destinations: Destination[];
   handleClick(e: MouseEvent<HTMLButtonElement>): void;
   showHints: boolean;
   cachedDestinations: {name: string; country: string;}[];
}
  

export const DestinationsHintsList: FC<DestinationsHintsListProps> = (props) => {

   const list = (items: {name: string; country: string;}[]): JSX.Element[] => items.map((dest, i) => { 
      return (
            <li tabIndex={-1} key={i}> 
               <HintsButtonStyled onClick={props.handleClick}>
                  <span>{dest.name}</span>
                  <span>{dest.country}</span>
               </HintsButtonStyled>            
            </li>
         )
   });

   const showListElement = () => {
      let element: null |  JSX.Element = null;
      const items: {name: string; country: string;}[] = [...props.cachedDestinations, ...props.destinations];
      console.log(items.map(x => x.country));
      
      if(props.destinations.length || props.cachedDestinations.length){
         element = (
            <HintsListStyles>
               <ul id="destination_hints_list" tabIndex={0}>
                   {list(items)} 
               </ul>
            </HintsListStyles>
         )
      }

      return element;
   }

   return (
      <>
         {showListElement()}
      </>
   )
   
};


 
