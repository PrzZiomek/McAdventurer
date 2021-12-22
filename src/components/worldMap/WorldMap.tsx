import React, { useState, FC, useEffect, useRef } from "react"
import { useCreateMap } from "./customHooks/useCreateMap";
import { createDomMarker } from "./helpers/createDomMarker";

import { I } from "./models/types/interfaces";
import { isMapEvent } from "./models/types/mapEvents";
import { Map } from "./styles/worldMapStyles";


export const WorldMap: FC<I.WorldMap> = (props) => {

    const mapRef = useRef(null);
    
    const [map] = useCreateMap(mapRef, [
      () => setMarker
    ])
      
    useEffect(() => {
      const layer = layerWithTheme(props.theme); 
      if(map && layer) map.setBaseLayer(layer); 
    }, [props.theme])

    useEffect(() => {
      if(!map) return;
      setMarker(map);
    }, [props.mapParams])

    const handleMapViewChange = (e: Event) => {    
      if(!isMapEvent(e, "mapviewchange")) return;         
      if (!(e.newValue && e.newValue.lookAt)) return; 
      const lookAt = e.newValue.lookAt;
      const lat = Math.trunc(lookAt.position.lat * 1E7) / 1E7;
      const lng = Math.trunc(lookAt.position.lng * 1E7) / 1E7;
      const zoom = Math.trunc(lookAt.zoom * 1E2) / 1E2;
      if(!props.setMapParams) return;
          props.setMapParams({
              lat,
              lng,
          })               
    }

    const mapPlatform = () => {
        const platform = new H.service.Platform({
            apikey: "zcdFfY4BuFMsIIBqpduLOVk5k6frv77VEhxqsATGbjI",        
        });
        return platform;
    }

    const layerWithTheme = (theme: string) => { 
        const platform = mapPlatform();
        if(!mapPlatform) return; 
        const tiles = platform.getMapTileService({'type': 'base'});
        const layer = tiles.createTileLayer(
            'maptile',
            theme,
            256, 
            'png',
            ); 
        return layer;
    }

    const  moveMapTo = (map: H.Map | null) =>{
        if(!map) return; 
        map.setCenter(props.mapParams);
    }

    const setMarker = (map: H.Map | null) =>{ 
        if(!map) return; 
        moveMapTo(map);
        const domIcon = createDomMarker();    
        const calibratedParams = { lat: props.mapParams.lat + 0.25, lng: props.mapParams.lng  }       
        var bearsMarker = new H.map.DomMarker(calibratedParams, {
          icon: domIcon
        });
        map.setZoom(10);
        map.addObject(bearsMarker); 
    }
    
    return (
      <Map mapRef={mapRef} ></Map>
    )
  }

       