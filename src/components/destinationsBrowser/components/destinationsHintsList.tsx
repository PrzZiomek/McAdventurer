import { MouseEvent, FC } from "react";

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
   languages: Language[];
}
  

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





















/*
export const DestinationsHintsList: FC<DestinationsHintsListProps> = (props) => {
   let i = 0;
   const findLanguage = (countryName: string) => props.languages.find((item) => { 
      const name = item.name.trim().toLowerCase();
      const country = countryName.trim().toLowerCase(); console.log("i!!!", i); 
      if(name.slice(0, 3) === country.slice(0, 3)){      
         return item.code;
      }
   }); 
   
   const list = (items: DestinationNames[]): JSX.Element[] =>{console.log("fire!");
    return items.map((dest, i) => { 
      const lang = findLanguage(dest.country);      
      return (
            <li tabIndex={-1} key={i}> 
               <HintsButtonStyled onClick={props.handleClick}>
                  <span lang={lang?.code}>{dest.name}</span>
                  <span>{dest.country}</span>
               </HintsButtonStyled>            
            </li>
         )
   });}

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
