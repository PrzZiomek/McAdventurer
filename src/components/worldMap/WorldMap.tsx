import React, { useState, FC, useEffect, useRef, MutableRefObject } from "react"
import { useCreateMap } from "./customHooks/useCreateMap";
import { createDomMarker } from "./helpers/createDomMarker";

import { I } from "./models/types/componentTypes";
import { isMapEvent } from "./models/types/mapEvents";
import { Map } from "./styles/worldMapStyles";


export const WorldMap: FC<I.WorldMap> = (props) => {

    const mapRef: MutableRefObject<null> = useRef(null);
    
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

    // unused for now
    const handleMapViewChange = (e: Event): void => {    
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

    const mapPlatform = (): H.service.Platform => {
        return new H.service.Platform({
            apikey: "zcdFfY4BuFMsIIBqpduLOVk5k6frv77VEhxqsATGbjI",        
        });
    }

    const layerWithTheme = (theme: string): H.map.layer.TileLayer | undefined => { 
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

  /*  const moveMapTo = (map: H.Map | null): void =>{
        if(!map) return; 
        map.setCenter(props.mapParams);
    }
*/
    const setMarker = (map: H.Map | null): void  =>{ 
      try{
        if(!map) return; 
        map.setCenter(props.mapParams);
        const domIcon = createDomMarker();    
        const calibratedParams = { lat: props.mapParams.lat + 0.25, lng: props.mapParams.lng  }       
        var bearsMarker = new H.map.DomMarker(calibratedParams, {
          icon: domIcon
        });
        map.setZoom(10);
        map.addObject(bearsMarker);
      }catch (err){
          console.log("Error when setting map params in setMarker function: ", err);         
      }
    }
    
    return (
      <Map mapRef={mapRef} ></Map>
    )
  }

       