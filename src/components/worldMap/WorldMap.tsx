import { useState, FC, useEffect, useRef, MutableRefObject, Dispatch, MouseEvent } from "react"
import { useDispatch, useSelector } from "react-redux";

import  errorActionCreator  from "../../generalHandlers/errorActionCreator";
import { useUserLocalization } from "./customHooks/useUserLocalization";
import { useCreateMap } from "./customHooks/useCreateMap";
import { createMarker } from "./helpers/createMarker";
import { createDestinationMarkerIcon } from "./helpers/mapMarker/createDestinationMarkerIcon";
import { createHomeMarkerIcon } from "./helpers/mapMarker/createHomeMarkerIcon";
import { I } from "./models/types/componentTypes";
import { MapStyled } from "./styles/worldMapStyles";
import { useDestinationLocation } from "./customHooks/useDestinationLocaton";


export const WorldMap: FC<I.WorldMap> = (props) => {

    const mapRef: MutableRefObject<null> = useRef(null);
    const [theme, setTheme] = useState<string>("normal.day");
    const [map, platform]: [H.Map | undefined, H.service.Platform | undefined]  = useCreateMap(mapRef);
    const dispatch = useDispatch();
    const createMarkerInit = createMarker(map, dispatch);
    const userLocationCoords = useUserLocalization();
    const destinationCoords = useDestinationLocation(props.destinations);

    useEffect(() => {
      const layer = layerWithTheme(theme); 
      if(map && layer) map.setBaseLayer(layer); 
    }, [theme])

    useEffect(() => {
      if(!map) return;
      createMarkerInit(destinationCoords, createDestinationMarkerIcon()) 
    }, [destinationCoords])

    useEffect(() => { 
      if(!map) return;
      createMarkerInit(userLocationCoords, createHomeMarkerIcon());   
    }, [userLocationCoords])
 
    const onChangeTheme = (e: MouseEvent<HTMLImageElement, globalThis.MouseEvent>) => {
      const themeElement = e.target as HTMLImageElement;    
      setTheme(themeElement.id)
    }

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
        <MapStyled mapRef={mapRef} ></MapStyled>
        {
          /*
            to move off when new panel will be created

             <MapThemesMenu onChangeTheme={onChangeTheme}/>
          */
        }
       
      </>
    )
  }

       