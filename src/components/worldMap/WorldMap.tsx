import { useState, FC, useEffect, useRef, MutableRefObject, Dispatch, MouseEvent } from "react"
import { useDispatch, useSelector } from "react-redux";

import  errorActionCreator  from "../../generalHandlers/errorActionCreator";
import { WikiDestination } from "../../generalTypes/apiResponse";
import { startLocationAction } from "../../state/actions/currentLocationAction";
import { Store } from "../../state/types";
import { MapThemesMenu } from "../mapThemesMenu/mapThemesMenu";
import { determineCoords } from "../searchMap/helpers/determineCoords";
import { useCreateMap } from "./customHooks/useCreateMap";
import { createDestinationMarker } from "./mapMarker/createDestinationMarker";
import { createHomeMarker } from "./mapMarker/createHomeMarker";
import { I } from "./models/types/componentTypes";
import { isMapEvent } from "./models/types/mapEvents";
import { MapStyled } from "./styles/worldMapStyles";


export const WorldMap: FC<I.WorldMap> = (props) => {

    const mapRef: MutableRefObject<null> = useRef(null);
    const [theme, setTheme] = useState<string>("normal.day");
    const [map, platform]: [H.Map | undefined, H.service.Platform | undefined]  = useCreateMap(mapRef);
    const [userLocationCoords, setUserLocationCoords] = useState({ lat: 0, lng: 0 }); 
    const [coords, setCoords] =  useState({ lat: 0, lng: 0 });
    const dispatch = useDispatch();

    useEffect(() => { 
      dispatch(startLocationAction()) 
    }, [dispatch])

    useEffect(() => {
      const layer = layerWithTheme(theme); 
      if(map && layer) map.setBaseLayer(layer); 
    }, [theme])

    useEffect(() => {
        
    }, [props.destinations])

    const destination: WikiDestination | undefined = useSelector((state: Store) => { 
        if(state.getDestination.loading !== false) return;
        return state.getDestination.destination;                                                         //  destination?.name === state.getDestination.destination.name                                                                                //setDestination(state.getDestination.destination)  
    })

    useEffect(() => { 
        if(!destination || !props.destinations) return;         
        const { lat, lng } = determineCoords(destination, props.destinations)
       
        setCoords({
            lat,
            lng,
        });     
        
    }, [destination?.name]);  

    useEffect(() => { 
      if(!map) return;
      createMarker(userLocationCoords, createHomeMarker());   
    }, [userLocationCoords])

    useEffect(() => {
      if(!map) return;
      const unsetCoords: boolean = !coords.lat && !coords.lng;
      if(!map || unsetCoords) return;
      createMarker(coords, createDestinationMarker()) 
      map.setCenter(coords); 
      map.setZoom(5);  
    }, [props.coords])

    const currentLocation = useSelector((state: Store) => { 
      return state.getCoordinates;
    });
  
    useEffect(() => {
        setUserLocationCoords(currentLocation);  
    }, [currentLocation])

    // unused for now
    const handleMapViewChange = (e: Event): void => {    
      if(!isMapEvent(e, "mapviewchange")) return;         
      if (!(e.newValue && e.newValue.lookAt)) return; 
      const lookAt = e.newValue.lookAt;
      const lat = Math.trunc(lookAt.position.lat * 1E7) / 1E7;
      const lng = Math.trunc(lookAt.position.lng * 1E7) / 1E7;
      const zoom = Math.trunc(lookAt.zoom * 1E2) / 1E2;
      if(!setCoords) return;
      setCoords({
          lat,
          lng,
      })               
    }

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

    const createMarker = (coords: { lat: number; lng: number; }, marker: H.map.DomIcon): void  => { 
        try{ 
            const unsetCoords: boolean = !coords.lat && !coords.lng;
            if(!map || unsetCoords) return;
            const bearsMarker: H.map.Object = new H.map.DomMarker(coords, {
              icon: marker
            });
            map.addObject(bearsMarker); 
            map.setCenter(coords); 
            map.setZoom(5);
        }
        catch (err){
            dispatch(errorActionCreator({
              message: "Error when setting map params in setMarker function",
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

       