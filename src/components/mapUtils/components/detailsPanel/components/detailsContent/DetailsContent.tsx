import { FC, useCallback, useEffect, useState } from "react"
import { useKeybordNav } from "../../../../../../customHooks/useKeybordNav";
import { Destination, DestinationDetailed } from "../../../../../../generalTypes/apiResponse";
import { List } from "../../../../../../ui/List";
import { DetailsContentStyled } from "./styles/DetailsContentStyled";

interface DetailsContent {
   content: {
      destinationName: string | undefined;
      localizationError: JSX.Element | null,
      clickedDestination: Destination | undefined | DestinationDetailed[];
   };
   ariaLabelledBy: string;
   id: string;
}


export const DetailsContent: FC<DetailsContent> = (props) => { 

   const [mapClicked, setMapClicked] = useState<boolean>(false); 
   const clickedDestinationArray = props.content.clickedDestination as DestinationDetailed[];
   const [ cursor, handleKeybordNavigation ] = useKeybordNav(clickedDestinationArray?.length, () => {});

   useEffect(() => {
      if(!clickedDestinationArray?.[0]?.name) return; 
      setMapClicked(true)
    }, [clickedDestinationArray?.[0]?.name])

    useEffect(() => {
      if(!props.content.destinationName) return;
      setMapClicked(false)
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
               listWrapperProps={{ onKeyDown: handleKeybordNavigation, className: "clickedDestination__List" }}
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
      
   const content: JSX.Element = mapClicked ? clickedDestinationElement() : typedDestinationElement();

   return ( 
      <DetailsContentStyled id={props.id}>
         {content}
      </DetailsContentStyled>
   )
}
