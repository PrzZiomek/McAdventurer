import { FC } from "react";

import { DestinationBrowser } from "../destinationsBrowser/DestinationsBrowser";
import { PanelWrapper } from "./styles/panelStyles";


interface Panel{
    destinations: string[];
}


export const Panel: FC<Panel> = (props) => (
    <PanelWrapper>
         <DestinationBrowser countryNames={props.destinations} />
    </PanelWrapper>
   )