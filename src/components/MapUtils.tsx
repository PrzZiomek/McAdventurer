import { useState, FC, useEffect, useRef, MutableRefObject, Dispatch, MouseEvent } from "react"
import { useDispatch } from "react-redux";
import { DestinationNameAndPos } from "../generalTypes/apiResponse";
import { DestinationBrowser } from "./destinationsBrowser/DestinationsBrowser";
import { PanelToggleBarStyled } from "./panel/components/panelToggleBar";
import { PanelStyled } from "./panel/styles/panelStyles";
import { I } from "./worldMap/models/types/componentTypes";


export const MapUtils: FC<I.MapUtils> = (props) => {

   const [showPanel, setShowPanel] = useState(false); 

   const handlePanelTogglerClick = () => setShowPanel(!showPanel); 

   return ( 
      <>
         <PanelStyled
            id="panel" 
            showPanel={showPanel}
         >
            <PanelToggleBarStyled
               className="toggleBar"
               switchToggleArrow={!showPanel} 
               toggleState={!showPanel}
               onClick={handlePanelTogglerClick}
            />
         </PanelStyled>
         <DestinationBrowser 
            destinations={props.destinations}
            setShowPanel={setShowPanel}
         />
      </>
   )
}

/*
 {  className="toggleBar"
               switchToggleArrow={toggleState} 
               toggle={setToggler} 
               toggleState={toggleState} }
*/