import React, { useState, FC, useEffect } from "react"
import { useSelector } from "react-redux";
import { Destination, DestinationDetailed, WikiDestination } from "../../../../generalTypes/apiResponse";
import { noCoordinates } from "../../../../helpers/noCoordinates";
import { Store } from "../../../../state/types";
import { PanelToggleBarStyled } from "../../styles/panelToggleBar";
import { DetailsContent } from "./components/detailsContent/DetailsContent";
import { DetailsPanelStyled } from "./styles/DetailsPanelStyled";


export interface DetailsPanelProps{
   showPanel?: boolean;
 }

export interface DetailsPanelRenderProps {
   showPanel: boolean;
   setShowPanel: React.Dispatch<React.SetStateAction<boolean>>;
   handleTogglerClick: () => void,
   detailsContentProps: {
      localizationError: JSX.Element | null,
      destinationName: string | undefined,
      clickedDestination: Destination | undefined | DestinationDetailed[] 
   };
}


export const DetailsPanel: FC<DetailsPanelProps> = (props) => {

   const [showPanel, setShowPanel] = useState<boolean>(false); 

   const detailsToggleBarId: string = "details_panel_toggle_bar";
   const detailsContentId: string = "details_content";
 
   const typedDestination: WikiDestination | undefined = useSelector((state: Store) => { 
      if(state.getDestination.loading !== false) return; 
      return state.getDestination.data;                                                                                                                                        //setDestination(state.getDestination.destination)  
   });

   const clickedDestination: Destination | DestinationDetailed[] | undefined = useSelector((state: Store) => { 
      if(state.getClickedDestination.loading !== false) return; 
      return state.getClickedDestination.data;                                                                                                                                        //setDestination(state.getDestination.destination)  
   });

   useEffect(() => {
      setShowPanel(true); 
    }, [typedDestination?.name])

    useEffect(() => {
      setShowPanel(true); 
    }, [clickedDestination?.name])

    useEffect(() => {
      setShowPanel(!!clickedDestination?.length); 
    }, [clickedDestination?.length])

   const getLocalizationError = (): JSX.Element | null => {
      if(!typedDestination?.coordinates || noCoordinates(typedDestination?.coordinates)){
         return <h3>coordinates not found</h3>;
      }  
      return null;
   } 

   const handleTogglerClick = (): void => { 
      if(!typedDestination?.name || !clickedDestination?.name) {
         setShowPanel(!showPanel);
         return;
      }      
      setShowPanel(false)
   }

   const detailsContentProps = {
      localizationError: getLocalizationError(),
      destinationName: typedDestination?.name,
      clickedDestination
   }

   return (
      <DetailsPanelStyled 
         id="details_panel" 
         ariaLabel="destination details panel"
         showPanel={showPanel}
      >
        <PanelToggleBarStyled
            className="toggleBar"
            toggleState={showPanel}
            onClick={handleTogglerClick}
            role="button"
            ariaLabel="details panel toggler"
            ariaControls={detailsContentId}
            id={detailsToggleBarId}
            ariaExpanded={showPanel}
         />  
         <DetailsContent
            content={detailsContentProps} 
            ariaLabelledBy={detailsToggleBarId}
            id={detailsContentId}
         />
      </DetailsPanelStyled>
   )
}

export const DetailsPanelMemo: React.NamedExoticComponent<DetailsPanelProps> = React.memo(DetailsPanel);
