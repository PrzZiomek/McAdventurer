import { Dispatch, useEffect } from "react";
import { useDispatch } from "react-redux";
import errorActionCreator from "../../../generalHandlers/errorActionCreator";
import { isNotNumber } from "../../../utils/isNotNumber";


export const createMarker = (map: H.Map | undefined, dispatch: Dispatch<any>) => {

   return (coords: { lat: number | null; lng: number | null; }, marker: H.map.DomIcon)  => { 
      
      try{ //console.log("coords im createM",  coords);
         const unsetCoords: boolean = isNotNumber(coords.lat) || isNotNumber(coords.lng);
          if(unsetCoords || !map) return;
          const bearsMarker: H.map.Object = new H.map.DomMarker(coords as H.geo.IPoint , {
            icon: marker
          });
          map.addObject(bearsMarker); 
          map.setCenter(coords as H.geo.IPoint); 
          map.setZoom(5);
      }
      catch (err){
          dispatch(errorActionCreator({
            message: "Error when setting map params in setMarker function",
            content: err as Error
          }))    
      }

  }

}