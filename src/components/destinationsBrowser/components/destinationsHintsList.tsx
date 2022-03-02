import {  useState,  ChangeEvent, MouseEvent, FC, KeyboardEvent, Dispatch, SetStateAction } from "react";
import { HintsListStyled } from "../styles/hintsListStyled";

interface DestinationsHintsListProps {
   destinations: { name: string, country: string }[];
}
 

export const DestinationsHintsList: FC<DestinationsHintsListProps> = (props) => {

   const list: JSX.Element[] = props.destinations.map((dest, i) => {
      return (
            <li key={i}> 
               <button>
                  <span>{dest.name}</span>
                  <span>{dest.country}</span>
               </button>            
            </li>
         )
   });

   return (
      <HintsListStyled id="hintsList">
         <ul> {list} </ul>
      </HintsListStyled>
   )
}