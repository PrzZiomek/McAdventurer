import { useState, FC, useEffect, useRef, MutableRefObject, Dispatch, MouseEvent, SetStateAction } from "react"
import { useDispatch, useSelector } from "react-redux";

import  errorActionCreator  from "../../generalHandlers/errorActionCreator";
import { useUserLocalization } from "./customHooks/useUserLocalization";
import { useCreateMap } from "./customHooks/useCreateMap";
import { createMarker } from "./helpers/createMarker";
import { createDestinationMarkerIcon } from "./helpers/mapMarker/createDestinationMarkerIcon";
import { createHomeMarkerIcon } from "./helpers/mapMarker/createHomeMarkerIcon";
import { MapStyled } from "./styles/worldMapStyles";
import { useDestinationLocation } from "./customHooks/useDestinationLocaton";
import { Store } from "../../state/types";
import { Destination } from "../../generalTypes/apiResponse";

export interface IWorldMap {
  destinations: Destination[] | undefined;
  mapParams?: H.geo.IPoint;
  coords?: {
    lat: number;
    lng: number;
},
  setCoords?: Dispatch<SetStateAction<{
    lat: number;
    lng: number;
}>>;
  typed?: string,
  userLocationCoords?: {
    lat: number;
    lng: number;
  }
}

 export const WorldMap: FC<IWorldMap> = (props) => {

    const mapRef: MutableRefObject<null> = useRef(null);
    const [map, platform]: [H.Map | undefined, H.service.Platform | undefined]  = useCreateMap(mapRef);
    const [currentMarker, setCurentMarker] = useState<H.map.Object | undefined>();
    const dispatch = useDispatch();
    const createMarkerInit = createMarker(map, dispatch);
    const userLocationCoords = useUserLocalization();
    const destinationCoords = useDestinationLocation(props.destinations);

    const theme = useSelector((store: Store) => {
      return store.getMapTheme.theme;
    })
    
    useEffect(() => {
      if(!map) return;
      map.addEventListener('tap',  (e) => {
        const extendedEvent = e as Event & {currentPointer : H.mapevents.Pointer};
        const coord: H.geo.Point = map.screenToGeo(extendedEvent.currentPointer.viewportX, extendedEvent.currentPointer.viewportY);
        const lat: number = Math.abs(+coord.lat.toFixed(4)); //  (coord.lat > 0) ? 'N' : 'S)'
        const lng: number = Math.abs(+coord.lng.toFixed(4)); // (coord.lng > 0) ? 'E' : 'W')
        dispatch({type: "FETCH_START.DEST_COORDS", coords: { lat, lng }});
      });
    }, [map])

    useEffect(() => {
      const layer = layerWithTheme(theme); 
      if(map && layer) map.setBaseLayer(layer); 
    }, [theme])

    useEffect(() => {
      if(!map) return;
      if(currentMarker) map.removeObject(currentMarker);
      const marker = createMarkerInit(destinationCoords, createDestinationMarkerIcon());
      setCurentMarker(marker);
    }, [destinationCoords])

    useEffect(() => { 
      if(!map) return;
      createMarkerInit(userLocationCoords, createHomeMarkerIcon());   
    }, [userLocationCoords])

    const layerWithTheme = (theme: string): H.map.layer.TileLayer | undefined => { 
        try{
            if(!platform) return; 
            const tiles = platform.getMapTileService({'type': 'base'});
            const layer = tiles.createTileLayer(
                'maptile',
                theme,
                256, 
                'png',
            ); 
            return layer;
        }
        catch(err){ 
          dispatch(errorActionCreator({
            message: "Error when setting map params with map layer",
            content: err as Error
          }))     
        }      
    }
    
    return (
      <>
        <MapStyled mapRef={mapRef} />
      </>
    )
  }


