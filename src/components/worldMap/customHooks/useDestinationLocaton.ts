import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { DestinationNameAndPos, WikiDestination } from "../../../generalTypes/apiResponse";
import { FIND_DESTINATION } from "../../../state/actions/actionTypes";
import { Store } from "../../../state/types";
import { isNotNumber } from "../../../utils/isNotNumber";


export function useDestinationLocation(destinations: DestinationNameAndPos[] | undefined): { lat: number; lng: number; } {

  const dispatch = useDispatch();

  const [ coords, setCoords] =  useState({ lat: 0, lng: 0 });

  const destinationCoords = useSelector((state: Store) => { 
    return state.getDestinationList.destination;
  });

  useEffect(() => { 
      if(!destinationCoords || isNotNumber(destinationCoords.lat) || isNotNumber(destinationCoords.lng)) return; console.log("swcond cords", destinationCoords);
      setCoords({
        lat: +destinationCoords.lat,
        lng: +destinationCoords.lng 
      });     
  }, [destinationCoords])

  const destination: WikiDestination | undefined = useSelector((state: Store) => { 
    if(state.getDestination.loading !== false) return;
    return state.getDestination.destination;                                                                                                                                    //setDestination(state.getDestination.destination)  
  })

  useEffect(() => { 
      if(!destination || !destinations) return;  
console.log("coordinates", destination.coordinates);

      const { coordinates } = destination;
  
      if(isNotNumber(coordinates?.lat) || isNotNumber(coordinates?.lng)){ 
            dispatch({
              type: FIND_DESTINATION,
              payload: destination.name 
            }) 
        }else {        
          setCoords({
            lat: coordinates?.lat,
            lng: coordinates?.lng  
          })
        }             
  }, [destination?.name]);  

  return coords;
}

