import { MouseEvent, FC } from "react";
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
            <li key={i}> 
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

      if(props.destinations.length || props.cachedDestinations.length){
         element = (
            <HintsListStyles>
               <ul> {list(items)} </ul>
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
   
}