import { FC } from "react";

import { DestinationBrowser } from "../destinationsBrowser/DestinationsBrowser";
import { PanelWrapper } from "./styles/panelStyles";


interface Panel{
    destinations: string[];
    bigScreenFit: boolean | undefined;
}


export const Panel: FC<Panel> = (props) =>{

    return (
        <PanelWrapper bigScreenFit={props.bigScreenFit}>
             <DestinationBrowser countryNames={props.destinations} />
        </PanelWrapper>
       )
} 