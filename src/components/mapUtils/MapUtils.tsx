import { FC } from "react"

import { DestinationBrowser } from "../destinationsBrowser/DestinationsBrowser";
import { PanelToggleBarStyled } from "./styles/panelToggleBar";
import { DetailsPanel, DetailsPanelRenderProps } from "./components/detailsPanel/DetailsPanel";
import { MenuPanel } from "./components/menuPanel/MenuPanel";
import { DetailsContent } from "./components/detailsPanel/components/detailsContent/DetailsContent";
import { Destination } from "../../generalTypes/apiResponse";


export interface MapUtils {
   destinations: Destination[] | undefined;
}

export const MapUtils: FC<MapUtils> = (props) => {

   return ( 
      <>
         <DetailsPanel render={(data: DetailsPanelRenderProps) => (
            <> 
               <PanelToggleBarStyled
                  className="toggleBar"
                  toggleState={data.showPanel}
               />  
               <DetailsContent 
                  content={data.detailsContentProps} 
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

 