import { MouseEvent, FC } from "react";
import { List } from "../../../ui/List";

import { HintsButtonStyled } from "../styles/hintsButtonStyled";
import { HintsListStyles } from "../styles/hintsListStyles";


type DestinationNames = {name: string; country: string;};
type Language =  {
   code: string;
   name: string;
   nativeName: string;
};

interface DestinationsHintsListProps {
   handleClick(e: MouseEvent<HTMLButtonElement>): void;
   showHints: boolean;
   items: DestinationNames[];
   findLanguage: (item: DestinationNames) => Language | undefined;
   highlightedItem: { name: string; country: string; };
}
  


export const DestinationsHintsList: FC<DestinationsHintsListProps> = (props) => {
   
   const showListElement = () => {
      let element: null |  JSX.Element = null;
      const returnListItem = (item: DestinationNames) => { 
         const lang = props.findLanguage(item);    
         const highligtedClass = props.highlightedItem?.name.trim().toLowerCase() === item.name.trim().toLowerCase() ? "highlight" : ""; 
         return (
            <HintsButtonStyled className={highligtedClass} onClick={props.handleClick}>
               <span lang={lang?.code}>{item.name}</span>
               <span>{item.country}</span> 
            </HintsButtonStyled>            
      )}

      if(props.items.length){
         element = (
            <HintsListStyles>
               <List 
                  listWrapperProps={{ id: "destination_hints_list" }}
                  items={props.items}
                  renderChildren={returnListItem}
               />
            </HintsListStyles>
         )
      }

      return element;
   };

   return (
      <>
         {showListElement()}
      </>
   )
   
};










/*
export const DestinationsHintsList: FC<DestinationsHintsListProps> = (props) => {
   
   const list = (items: DestinationNames[]): JSX.Element[] => items.map((dest, i) => { 
      const lang = props.languages[i]; 
      return (
            <li tabIndex={-1} key={i}> 
               <HintsButtonStyled onClick={props.handleClick}>
                  <span lang={lang?.code}>{dest.name}</span>
                  <span>{dest.country}</span>
               </HintsButtonStyled>            
            </li>
         )
   });

   const showListElement = () => {
      let element: null |  JSX.Element = null;
      
      if(props.items.length){
         element = (
            <HintsListStyles>
               <ul id="destination_hints_list" tabIndex={0}>
                   {list(props.items)} 
               </ul>
            </HintsListStyles>
         )
      }

      return element;
   };

   return (
      <>
         {showListElement()}
      </>
   )
   
};

*/