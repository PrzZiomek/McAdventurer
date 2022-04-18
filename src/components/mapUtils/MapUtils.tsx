import { useState, FC } from "react"
import { DestinationBrowser } from "../destinationsBrowser/DestinationsBrowser";
import { PanelToggleBarStyled } from "./styles/panelToggleBar";
import { MapUtilsStyled } from "./styles/mapUtilsStyled";
import { I } from "../worldMap/models/types/componentTypes";


export const MapUtils: FC<I.MapUtils> = (props) => {

   const [showPanel, setShowPanel] = useState(false); 

   const handlePanelTogglerClick = () => setShowPanel(!showPanel); 

   return ( 
      <>
         <MapUtilsStyled
            id="panel" 
            showPanel={showPanel}
         >
            <PanelToggleBarStyled
               className="toggleBar"
               switchToggleArrow={!showPanel} 
               toggleState={!showPanel}
               onClick={handlePanelTogglerClick}
            />
         </MapUtilsStyled>
         <DestinationBrowser
            destinations={props.destinations}
            setShowPanel={setShowPanel}
         />
      </>
   )
}

