import { FC } from "react"
import { Destination, DestinationDetailed } from "../../../../../../generalTypes/apiResponse";
import { DetailsContentStyled } from "./styles/DetailsContentStyled"

interface DetailsContent {
   content: {
      destinationName: string | undefined;
      localizationError: JSX.Element | null,
      clickedDestination: Destination | undefined | DestinationDetailed[];
   }
}

export const DetailsContent: FC<DetailsContent> = (props) => { console.log("props.content.clickedDestination", props.content.clickedDestination);

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
                           <div>{`
                              ${dest.country || ""}, 
                              ${dest.region || ""}, 
                              ${dest.county || ""}, 
                              ${dest.locality || ""}
                           `}</div>
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
               <div>{`${dest.country}}`}</div>
            </div>
          ) 
      } 
      return element;
    } 

    const typedDestination: JSX.Element = (
      <>
        <h2> {props.content.destinationName} </h2>
         <div>
            {props.content.localizationError}
            <div>
            
            </div>
         </div>
    </>)

    const clickedDestination: JSX.Element = (
      <> { destinationList() || destination() }</>
    )

   const content: JSX.Element = props.content.destinationName ? typedDestination : clickedDestination;

   return ( 
      <DetailsContentStyled>
         {content}
      </DetailsContentStyled>
   )
}