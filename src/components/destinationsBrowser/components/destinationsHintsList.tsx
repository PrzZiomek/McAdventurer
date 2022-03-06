import {  useState,  ChangeEvent, MouseEvent, FC, KeyboardEvent, Dispatch, SetStateAction } from "react";
import { HintsButtonStyled } from "../styles/hintsButtonStyled";
import { HintsListStyled } from "../styles/hintsListStyled";

interface DestinationsHintsListProps {
   destinations: { name: string, country: string }[];
   handleClick(e: MouseEvent<HTMLButtonElement>): void;
   showHints: boolean;
}
 

export const DestinationsHintsList: FC<DestinationsHintsListProps> = (props) => {

   const list: JSX.Element[] = props.destinations.map((dest, i) => {
      return (
            <li key={i}> 
               <HintsButtonStyled handleClick={props.handleClick}>
                  <span>{dest.name}</span>
                  <span>{dest.country}</span>
               </HintsButtonStyled>            
            </li>
         )
   });

   return (
      <HintsListStyled id="hintsList">
         <ul> {list} </ul>
      </HintsListStyled>
   )
}