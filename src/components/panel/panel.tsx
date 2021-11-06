import { Dispatch, FC, SetStateAction, useState } from "react";

import { DestinationBrowser } from "../destinationsBrowser/DestinationsBrowser";
import { PanelToggleBar } from "./components/panelToggleBar";
import { PanelWrapper } from "./styles/panelStyles";


interface Panel{
    destinations: string[];
    setTypedValue: Dispatch<SetStateAction<string>>
}


export const Panel: FC<Panel> = (props) =>{

    const [toggleState, setToggler] = useState(true);

    return (
        <PanelWrapper showUpBar={toggleState}>
             <DestinationBrowser 
                    countryNames={props.destinations}
                    setTypedValue={props.setTypedValue}
             />
             <PanelToggleBar 
                switchToggleArrow={toggleState} 
                toggle={setToggler} 
                toggleState={toggleState}
             />
        </PanelWrapper>
       )
} 