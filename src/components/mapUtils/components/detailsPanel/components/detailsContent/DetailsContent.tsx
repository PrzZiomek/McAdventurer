import { FC, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Destination, DestinationDetailed } from "../../../../../../generalTypes/apiResponse";
import { Store } from "../../../../../../state/types";
import { DetailsContentStyled } from "./styles/DetailsContentStyled"

interface DetailsContent {
   content: {
      destinationName: string | undefined;
      localizationError: JSX.Element | null,
      clickedDestination: Destination | undefined | DestinationDetailed[];
   }
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
      if(Array.isArray(destList)){ 
         element = (
            <ul>
               { destList.map((dest, i) => {
                  return (
                     <li key={i}>
                        <div>
                           <h4>{dest.name}</h4>
                           <p>{`
                              ${dest.country || ""}, ${dest.region || ""}, ${dest.county || ""}, ${dest.locality || ""}
                           `}</p>
                        </div>
                     </li>
                  )
                  })}
            </ul>
         ) 
      } 
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

    const typedDestinationElement: JSX.Element = (
      <div id="content_wrapper">
        <h2> {props.content.destinationName} </h2>
         <div>
            {props.content.localizationError}
            <div>
            
            </div>
         </div>
    </div>)

    const clickedDestinationElement: JSX.Element = (
      <> { destinationList() || destination() }</>
    )
      
   const content: JSX.Element = mapClicked ? clickedDestinationElement : typedDestinationElement;

   return ( 
      <DetailsContentStyled>
         {content}
      </DetailsContentStyled>
   )
}

  /* const [typedDestinationName, setTypedDestinationName] = useState<string>(); 
   
   const destinationName: string| undefined = useSelector((state: Store) => { 
      if(state.getDestination.loading !== false) return; 
      return state.getDestination.data.name;                                                                                                                                        //setDestination(state.getDestination.destination)  
   });
*/