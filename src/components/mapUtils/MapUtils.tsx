import { FC } from "react"

import { PanelToggleBarStyled } from "./styles/panelToggleBar";
import { DetailsPanel, DetailsPanelRenderProps } from "./components/detailsPanel/DetailsPanel";
import { DetailsContent } from "./components/detailsPanel/components/detailsContent/DetailsContent";
import { Destination } from "../../generalTypes/apiResponse";
import { UtilsTopSection } from "./components/utilsTopSection/UtilsTopSection";


export interface MapUtils {
   destinations: Destination[] | undefined;
}

export const MapUtils: FC<MapUtils> = (props) => {

   return ( 
      <>
         <UtilsTopSection destinations={props.destinations}/>

         <DetailsPanel render={(data: DetailsPanelRenderProps) => (
            <> 
               <PanelToggleBarStyled
                  className="toggleBar"
                  toggleState={data.showPanel}
                  onClick={() => data.setShowPanel(!data.showPanel)}
                  role="button"
               />  
               <DetailsContent 
                  content={data.detailsContentProps} 
               />
            </>
         )}/>  

        
      </>
   )
}

 