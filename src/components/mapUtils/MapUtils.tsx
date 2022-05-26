import { useState, FC } from "react"
import { DestinationBrowser } from "../destinationsBrowser/DestinationsBrowser";
import { PanelToggleBarStyled } from "./styles/panelToggleBar";
import { I } from "../worldMap/models/types/componentsInterfaces";
import { DetailsPanel } from "./components/detailsPanel/DetailsPanel";
import { MapThemesMenu } from "../mapThemesMenu/MapThemesMenu";
import { Menu } from "./components/menu/Menu";
import { MenuButtonStyled } from "./components/menu/styles/MenuStyled";


export const MapUtils: FC<I.MapUtils> = (props) => {

   return ( 
      <>
         <DetailsPanel render={data => (
            <PanelToggleBarStyled
               className="toggleBar"
               switchToggleArrow={data.showPanel} 
               toggleState={data.showPanel}
            />    
         )}/>

         <DestinationBrowser
            destinations={props.destinations}
         />

         <div id="right_panel">
            <MenuButtonStyled handleClick={() => {}}>menu</MenuButtonStyled>
            <Menu>
               <MapThemesMenu />
            </Menu>
         </div>
      </>
   )
}

 