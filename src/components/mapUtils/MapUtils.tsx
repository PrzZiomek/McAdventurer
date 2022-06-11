import { useState, FC } from "react"
import { DestinationBrowser } from "../destinationsBrowser/DestinationsBrowser";
import { PanelToggleBarStyled } from "./styles/panelToggleBar";
import { I } from "../worldMap/models/types/componentsInterfaces";
import { DetailsPanel, DetailsPanelRenderProps, RenderProps } from "./components/detailsPanel/DetailsPanel";
import { MenuPanel } from "./components/menuPanel/MenuPanel";
import { DetailsContent } from "./components/detailsPanel/components/detailsContent/DetailsContent";


export const MapUtils: FC<I.MapUtils> = (props) => {

   return ( 
      <>
         <DetailsPanel render={(data: DetailsPanelRenderProps) => (
            <> 
               <PanelToggleBarStyled
                  className="toggleBar"
                  toggleState={data.showPanel}
               />  
               <DetailsContent 
                  headerText={data.detailsContentProps.destinationName} 
                  localizationError={data.detailsContentProps.localizationError}
               />
            </>
         )}/>  

         <DestinationBrowser
            destinations={props.destinations}
         />

          <MenuPanel/>
      </>
   )
}

 