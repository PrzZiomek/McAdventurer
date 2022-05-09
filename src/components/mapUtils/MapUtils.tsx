import { useState, FC } from "react"
import { DestinationBrowser } from "../destinationsBrowser/DestinationsBrowser";
import { PanelToggleBarStyled } from "./styles/panelToggleBar";
import { I } from "../worldMap/models/types/componentsInterfaces";
import { DetailsPanel } from "./components/detailsPanel/DetailsPanel";


export const MapUtils: FC<I.MapUtils> = (props) => {

   return ( 
      <>
         <DetailsPanel render={data => (
            <PanelToggleBarStyled
               className="toggleBar"
               switchToggleArrow={data.showPanel} 
               toggleState={data.showPanel}
            />    
         )}/>

         <DestinationBrowser
            destinations={props.destinations}
         />
      </>
   )
}

