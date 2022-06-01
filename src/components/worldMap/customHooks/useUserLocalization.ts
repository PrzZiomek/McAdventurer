import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { startLocationAction } from "../../../state/actions/actions/currentLocation";
import { Store } from "../../../state/types";


export function useUserLocalization(): { lng: number, lat: number } {

   const dispatch = useDispatch();

   useEffect(() => { 
      dispatch(startLocationAction()) 
   }, [dispatch])

   const currentLocation = useSelector((state: Store) => { 
      return state.getCoordinates.data;
   });

   return currentLocation;
}