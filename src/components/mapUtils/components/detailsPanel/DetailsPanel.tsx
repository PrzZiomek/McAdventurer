import { useState, FC, useEffect } from "react"
import { useSelector } from "react-redux";
import { Destination, DestinationDetailed, WikiDestination } from "../../../../generalTypes/apiResponse";
import { noCoordinates } from "../../../../helpers/noCoordinates";
import { Store } from "../../../../state/types";
import { DetailsPanelStyled } from "./styles/DetailsPanelStyled";


export interface IDetailsPanel{
   render: (data: any) => JSX.Element,
   showPanel?: boolean;
 }

export interface DetailsPanelRenderProps {
   showPanel: boolean
   detailsContentProps: {
      localizationError: JSX.Element | null,
      destinationName: string | undefined,
      clickedDestination: Destination | undefined | DestinationDetailed[] 
   }, 
}


export const DetailsPanel: FC<IDetailsPanel> = (props) => {

   const [showPanel, setShowPanel] = useState(false); 

   const destination: WikiDestination | undefined = useSelector((state: Store) => { 
      if(state.getDestination.loading !== false) return; 
      return state.getDestination.data;                                                                                                                                        //setDestination(state.getDestination.destination)  
   });

   const clickedDestination: Destination | DestinationDetailed[] | undefined = useSelector((state: Store) => { 
      if(state.getClickedDestination.loading !== false) return; 
      return state.getClickedDestination.data;                                                                                                                                        //setDestination(state.getDestination.destination)  
   });
// ???
   useEffect(() => {
      setShowPanel(!!destination?.name); 
    }, [destination?.name])

    useEffect(() => {
      setShowPanel(!!clickedDestination?.name); console.log("setShowPanel", !!destination?.name);      
    }, [clickedDestination?.name])

    useEffect(() => {
      setShowPanel(!!clickedDestination?.length); 
    }, [clickedDestination?.length])

   const getLocalizationError = (): JSX.Element | null => {
      if(!destination?.coordinates || noCoordinates(destination?.coordinates)){
         return <h3>coordinates not found</h3>;
      }  
      return null;
   } 

   const renderProps: DetailsPanelRenderProps = {
      showPanel,
      detailsContentProps: {
          localizationError: getLocalizationError(),
          destinationName: destination?.name,
          clickedDestination 
      },
    }

   return (
      <DetailsPanelStyled 
         id="detailsPanel" 
         showPanel={showPanel}
      >
        {props.render(renderProps)}
      </DetailsPanelStyled>
   )
}

/*
 const handlePanelTogglerClick = () => setShowPanel(!showPanel); 
*/
