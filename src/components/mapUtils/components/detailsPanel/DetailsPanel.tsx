import { useState, FC, useEffect } from "react"
import { useSelector } from "react-redux";
import { Store } from "../../../../state/types";
import { I } from "../../../worldMap/models/types/componentsInterfaces";
import { DetailsPanelStyled } from "./styles/DetailsPanelStyled";


export const DetailsPanel: FC<I.DetailsPanel> = (props) => {

   const [showPanel, setShowPanel] = useState(false); 

   const destinationName: string | undefined = useSelector((state: Store) => { 
      if(state.getDestination.loading !== false) return;
      return state.getDestination.data?.name;                                                                                                                                    //setDestination(state.getDestination.destination)  
   })

   useEffect(() => {
      setShowPanel(!!destinationName); 
    }, [destinationName])

   return (
      <DetailsPanelStyled 
         id="panel" 
         showPanel={showPanel}
      >
         {props.render({showPanel})}
      </DetailsPanelStyled>
   )
}

/*
 const handlePanelTogglerClick = () => setShowPanel(!showPanel); 
*/
