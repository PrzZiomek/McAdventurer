import { FC, useState } from "react";

import { DestinationBrowser } from "../destinationsBrowser/DestinationsBrowser";
import { PanelToggleBar } from "./components/panelToggleBar";
import { PanelWrapper } from "./styles/panelStyles";


interface Panel{
    destinations: string[];
}


export const Panel: FC<Panel> = (props) =>{

    const [toggleState, setToggler] = useState(true);

    return (
        <PanelWrapper showUpBar={toggleState}>
             <DestinationBrowser countryNames={props.destinations} />
             <PanelToggleBar 
                switchToggleArrow={toggleState} 
                toggle={setToggler} 
                toggleState={toggleState}
             />
        </PanelWrapper>
       )
} 