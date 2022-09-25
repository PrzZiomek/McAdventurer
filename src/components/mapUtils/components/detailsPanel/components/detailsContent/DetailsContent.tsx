import { FC, useCallback, useEffect, useState } from "react"
import { Destination, DestinationDetailed } from "../../../../../../generalTypes/apiResponse";
import { List } from "../../../../../../ui/List";
import { DetailsContentStyled } from "./styles/DetailsContentStyled";
import React from "react";
import { BarList } from "../barsList/BarList";


interface DetailsContentProps {
   content: {
      destinationName: string | undefined;
      localizationError: JSX.Element | null,
      clickedDestination: Destination | undefined;
   };
   ariaLabelledBy: string;
   id: string;
}


export const DetailsContent: FC<DetailsContentProps> = (props) => { 

   const [isMapClicked, setisMapClicked] = useState<boolean>(false); 

   useEffect(() => {
      if(props.content.clickedDestination?.name) return; 
      setisMapClicked(true)
    }, [props.content.clickedDestination?.name])

    useEffect(() => {
      if(!props.content.destinationName) return;
      setisMapClicked(false)
    }, [props.content.destinationName])

   const destinationList = (): JSX.Element | null => { 
      const destList: DestinationDetailed[] | undefined | Destination = props.content.clickedDestination;
      let element: JSX.Element | null = null;

      const buildDestinationInfoText = (dest: DestinationDetailed) => (acc: string, key: string) => {
         const DestinationInfoKey = key as keyof DestinationDetailed;
         if(dest[DestinationInfoKey]){
            acc += `${dest[DestinationInfoKey]}, `;
         };          
         return acc;
      };

      const showInfoHeader = (name: string | undefined): JSX.Element | null => name ? <h4>{name}</h4> : null;
       // to do: list is not needed anymore
      if(Array.isArray(destList)){ 
         const collectDestinationInfo = (dest: DestinationDetailed) => ["country", "region", "county", "locality"].reduce(buildDestinationInfoText(dest), "");
         const returnListItem = (item: DestinationDetailed, i?: number) => {
            const highligtedClass = cursor === i ? "highlight" : "";   
            return (
               <div className={highligtedClass}>
                     {showInfoHeader(item.name)}
                     <p> {collectDestinationInfo(item)} </p>
               </div>
         )}

         element = (  
            <List 
               items={destList}
               listWrapperProps={{ className: "clickedDestination__List" }}
               renderChildren={returnListItem}
            />
          ) 
      };

      return element;
   } 

   const destination = (): JSX.Element | null => {
      let element: JSX.Element | null = null;
      const dest = props.content.clickedDestination as Destination | undefined;
      if(dest){
          element = (
            <div>
               <h4>{dest.name}</h4>
               <div>{dest.country}</div>
               <div>{dest?.content}</div>
            </div>
          ) 
      } 
      return element;
    } 

    const typedDestinationElement = (): JSX.Element => {
       const showDestinationName = () => props.content.destinationName ? <h2> {props.content.destinationName} </h2> : null;
       return (
         <div id="content_wrapper">
            {showDestinationName()} 
            {props.content.localizationError}
      </div>)
    }

    const clickedDestinationElement = (): JSX.Element => (
      <> { destinationList() || destination() }</>
    );
      
   const content: JSX.Element = isMapClicked ? clickedDestinationElement() : typedDestinationElement();

   const showBarList = (): JSX.Element | null => props.content.destinationName || props.content.clickedDestination ? <BarList isMapClicked={isMapClicked} /> : null;

   return ( 
      <DetailsContentStyled id={props.id}>
         {content}
         {showBarList()}
      </DetailsContentStyled>
   )
}
