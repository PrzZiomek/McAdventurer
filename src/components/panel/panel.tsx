import { Dispatch, FC, SetStateAction, useState } from "react";
import { DestinationNameAndPos } from "../../dataModels/types";

import  {DestinationBrowser}  from "../destinationsBrowser/DestinationsBrowser";
import { PanelToggleBar } from "./components/panelToggleBar";
import { PanelWrapper } from "./styles/panelStyles";


interface Panel{
    destinations: DestinationNameAndPos[];
  //  updateDestinationsSet: Dispatch<SetStateAction<string[]>>
}


export const Panel: FC<Panel> = (props) =>{

    const [toggleState, setToggler] = useState(true);

    return (
        <PanelWrapper id="panel" showUpBar={toggleState}>
             <DestinationBrowser 
                destinations={props.destinations}
             />
             <PanelToggleBar 
                switchToggleArrow={toggleState} 
                toggle={setToggler} 
                toggleState={toggleState}
             />
        </PanelWrapper>
       )
} 