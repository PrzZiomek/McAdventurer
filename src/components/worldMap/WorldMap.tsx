import React, { useState, FC, useEffect } from "react"

import { I } from "./models/types/interfaces";
import { Map } from "./styles/worldMapStyles";


export const WorldMap: FC<I.WorldMapWithData> = (props) => {

  const [map, setMap] = useState<H.Map | null>(null);

  const mapRef = React.useRef(null);
    
   useEffect(() => {
       return () => {     
        if (map) {
          map.removeEventListener('mapviewchange',() => props.setMarker);
        }
      };
     }, []);

    useEffect(() => {
      const layer = props.layerWithTheme(props.theme); 
      if(map && layer) map.setBaseLayer(layer); 
    }, [props.theme])

    React.useLayoutEffect(() =>{
        if(!mapRef.current) return;
        const platform = props.mapPlatform(); 
        const defaultLayers = platform.createDefaultLayers();
        const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
            center: {lat: 0, lng: 0},
            zoom: 0,
            pixelRatio: window.devicePixelRatio || 1,
        });
        setMap(hMap);
        const oldZoom = map?.getZoom();
        hMap.addEventListener('mapviewchangeend',() => {
        /*  const newZoom = map?.getZoom();
          if(newZoom - oldZoom === 5){
            props.setMarker(map)
          }*/ props.setMarker(map)
        });
        hMap.addEventListener('resize', () => hMap.getViewPort().resize());
        new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap)); 
        return () => { hMap.dispose() };
    }, [mapRef]);
        
    props.setMarker(map)
    
    return (
      <Map mapRef={mapRef} ></Map>
    )
  }

       
