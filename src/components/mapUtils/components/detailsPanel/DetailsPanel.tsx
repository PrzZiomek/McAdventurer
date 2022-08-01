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
   showPanel: boolean;
   setShowPanel: React.Dispatch<React.SetStateAction<boolean>>;
   detailsContentProps: {
      localizationError: JSX.Element | null,
      destinationName: string | undefined,
      clickedDestination: Destination | undefined | DestinationDetailed[] 
   };
}


export const DetailsPanel: FC<IDetailsPanel> = (props) => {

   const [showPanel, setShowPanel] = useState<boolean>(false); 

   const typedDestination: WikiDestination | undefined = useSelector((state: Store) => { 
      if(state.getDestination.loading !== false) return; 
      return state.getDestination.data;                                                                                                                                        //setDestination(state.getDestination.destination)  
   });

   const clickedDestination: Destination | DestinationDetailed[] | undefined = useSelector((state: Store) => { 
      if(state.getClickedDestination.loading !== false) return; 
      return state.getClickedDestination.data;                                                                                                                                        //setDestination(state.getDestination.destination)  
   });

   useEffect(() => {
      setShowPanel(!!typedDestination?.name); 
    }, [typedDestination?.name])

    useEffect(() => {
      setShowPanel(!!clickedDestination?.name); 
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

   const renderProps: DetailsPanelRenderProps = {
      setShowPanel,
      showPanel,
      detailsContentProps: {
          localizationError: getLocalizationError(),
          destinationName: typedDestination?.name,
          clickedDestination
      },
    }

   return (
      <DetailsPanelStyled 
         id="details_panel" 
         ariaLabel="destination details panel"
         showPanel={showPanel}
      >
        {props.render(renderProps)}
      </DetailsPanelStyled>
   )
}

