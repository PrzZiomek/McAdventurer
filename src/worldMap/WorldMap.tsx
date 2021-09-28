import React, { useState, FC, Dispatch, SetStateAction, useEffect } from "react"
import styled from "styled-components";
import onResize from 'simple-element-resize-detector';
import { isMapEvent } from "./models/types/mapEvents";

const MapStyles = styled.div`

   canvas{
    width: 600px !important;
    height: 550px !important;
    margin-top: 10px !important;
   }
`

interface WorldMap{
  mapParams:{ [x: string]: number; };
  setMapPrams: Dispatch<SetStateAction<{ [x: string]: number; }>>
}


export const WorldMap: FC<WorldMap> = (props) => {

    const [map, setMap] = useState<H.Map | null>(null);

    const mapRef = React.useRef(null);

    const handleMapViewChange = (e: Event) => {   
      if(!isMapEvent(e, "mapviewchange")) return;
      if (e.newValue && e.newValue.lookAt) {
        const lookAt = e.newValue.lookAt;
        const lat = Math.trunc(lookAt.position.lat * 1E7) / 1E7;
        const lng = Math.trunc(lookAt.position.lng * 1E7) / 1E7;
        const zoom = Math.trunc(lookAt.zoom * 1E2) / 1E2;
        props.setMapPrams({lat});
        props.setMapPrams({lng});
        props.setMapPrams({zoom});
      }
    }
/*
    const resize = () => {
      if(!mapRef.current || !map) return;
        onResize(mapRef.current, () => {
          map.getViewPort().resize();
        });      
    }
*/
    useEffect(() => {
      return () => {
        if (map) {
          map.removeEventListener('mapviewchange', handleMapViewChange);
        }
      };
     }, []);

    React.useLayoutEffect(() =>{
        if(!mapRef.current) return;
        const platform = new H.service.Platform({
            apikey: "zcdFfY4BuFMsIIBqpduLOVk5k6frv77VEhxqsATGbjI",        
        });
        const defaultLayers = platform.createDefaultLayers();
        const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
            center: {lat: props.mapParams["lat"], lng: props.mapParams["lng"]},
            zoom: props.mapParams["zoom"],
            pixelRatio: window.devicePixelRatio || 1,
        });
        setMap(hMap);
      //  resize();  
        
        hMap.addEventListener('mapviewchange', handleMapViewChange);
        new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));
        return () => { hMap.dispose() };
    }, [mapRef]);

    return (
        <MapStyles ref={mapRef} style={{ height: "500px", width: "600px" }}></MapStyles>
    )
}

/*
export default function useDidMountHook(callback) {
  const didMount = useRef(null)

  useEffect(() => {
    if (callback && !didMount.current) {
      didMount.current = true
      callback()
    }
  })
}
*/