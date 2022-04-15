import { Dispatch, FC, SetStateAction, useState } from "react";
import { DestinationNameAndPos } from "../../generalTypes/apiResponse";

import  {DestinationBrowser}  from "../destinationsBrowser/DestinationsBrowser";
import { I } from "../worldMap/models/types/componentTypes";
import { PanelToggleBar } from "./components/panelToggleBar";
import { PanelStyled } from "./styles/panelStyles";

/*
export const Panel: FC<I.Panel> = (props) => {

    const [toggleState, setToggler] = useState(true); 

    return (
        <PanelStyled 
            id="panel" 
            showPanel={props.showPanel}
        >
             <PanelToggleBar 
                className="toggleBar"
                switchToggleArrow={toggleState} 
                toggle={setToggler} 
                toggleState={toggleState}
             />
        </PanelStyled>
   )
} */