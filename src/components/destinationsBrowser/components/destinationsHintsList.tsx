import {  useState,  ChangeEvent, MouseEvent, FC, KeyboardEvent, Dispatch, SetStateAction } from "react";
import { Destination } from "../../../generalTypes/apiResponse";
import { HintsButtonStyled } from "../styles/hintsButtonStyled";
import { HintsListStyles } from "../styles/hintsListStyles";

interface DestinationsHintsListProps {
   destinations: Destination[] | {name: string; country: string;}[];
   handleClick(e: MouseEvent<HTMLButtonElement>): void;
   showHints: boolean;
}
 

export const DestinationsHintsList: FC<DestinationsHintsListProps> = (props) => {

   const list: JSX.Element[] = props.destinations.map((dest, i) => {
      return (
            <li key={i}> 
               <HintsButtonStyled onClick={props.handleClick}>
                  <span>{dest.name}</span>
                  <span>{dest.country}</span>
               </HintsButtonStyled>            
            </li>
         )
   });

   const listElement = () => {
      let element: null |  JSX.Element = null;

      if(props.destinations.length){
         element = (
            <HintsListStyles>
               <ul> {list} </ul>
            </HintsListStyles>
         )
      }

      return element;
   }

   return (
      <>
         {listElement()}
      </>
   )
}