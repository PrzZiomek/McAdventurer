import { FC, useEffect, useState } from "react"
import { Destination, DestinationDetailed } from "../../../../../../generalTypes/apiResponse";
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
         element = (
            <ul>
               { destList.map((dest, i) => {
                  const destinationInfo = ["country", "region", "county", "locality"].reduce(buildDestinationInfoText(dest), "");
 
                  return (
                     <li key={i}>
                        <div>
                           {showInfoHeader(dest.name)}
                           <p> {destinationInfo} </p>
                        </div>
                     </li>
                  )
                  })}
            </ul>
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
            <div>
               {props.content.localizationError}
               <div>
               
               </div>
            </div>
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

