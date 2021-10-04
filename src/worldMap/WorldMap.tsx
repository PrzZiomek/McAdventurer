import React, { useState, FC, useEffect } from "react"
import styled from "styled-components";
import { I } from "./models/types/interfaces";

const MapStyles = styled.div`

   canvas{
    width: 900px !important;
    height: 650px !important;
    margin-top: 10px !important;
   }
`

export const WorldMap: FC<I.WorldMapWithData> = (props) => {

  const [map, setMap] = useState<H.Map | null>(null);

  const mapRef = React.useRef(null);
    
   useEffect(() => {
      return () => {
        if (map) {
          map.removeEventListener('mapviewchange', () => props.handleMapViewChange);
        }
      };
     }, []);

    useEffect(() => {
      const layer = props.layerWithTheme(props.theme); 
      if(map && layer) map.setBaseLayer(layer);
    }, [props.theme])

    React.useLayoutEffect(() =>{
        if(!mapRef.current) return;
        const platform = new H.service.Platform({
            apikey: "zcdFfY4BuFMsIIBqpduLOVk5k6frv77VEhxqsATGbjI",        
        });
        props.setMapPlatform(platform);
        const defaultLayers = platform.createDefaultLayers();
        const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
            center: {lat: 0, lng: 0},
            zoom: 0,
            pixelRatio: window.devicePixelRatio || 1,
        });
        setMap(hMap);
        hMap.addEventListener('mapviewchange',() => props.handleMapViewChange);
        new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));
        return () => { hMap.dispose() };
    }, [mapRef]);

    return (
        <MapStyles ref={mapRef} style={{ height: "650px", width: "900px" }}></MapStyles>
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

interface TestVectorLayer {
}

const TestVectorLayer = function (this: TestVectorLayer, layerName: string) {
  ol.layer.Image.call(this, opts);
} as any as { new (layerName: string): TestVectorLayer; };

ol.inherits(TestVectorLayer, ol.layer.Image);

export default TestVectorLayer; 

const layer = new TestVectorLayer(layerName); 



const resize = () => {
      if(!mapRef.current || !map) return;
        onResize(mapRef.current, () => {
          map.getViewPort().resize();
        });      
    }











export const WorldMap: FC<WorldMap> = (props) => {

    const [map, setMap] = useState<H.Map | null>(null);
    const [mapPlatform, setMapPlatform] = useState<H.service.Platform | null>(null);

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

    const changeTheme = (theme: string) => {
      if(!mapPlatform) return;
      var tiles = mapPlatform.getMapTileService({'type': 'base'});
      var layer = tiles.createTileLayer(
          'maptile',
          theme,
          256, 
          'png',
      );
      if(map) map.setBaseLayer(layer);
    }
    const resize = () => {
      if(!mapRef.current || !map) return;
        onResize(mapRef.current, () => {
          map.getViewPort().resize();
        });      
    }
    useEffect(() => {
      return () => {
        if (map) {
          map.removeEventListener('mapviewchange', handleMapViewChange);
        }
      };
     }, []);

    useEffect(() => {
        changeTheme(props.theme)
    }, [props.theme])

    React.useLayoutEffect(() =>{
        if(!mapRef.current) return;
        const platform = new H.service.Platform({
            apikey: "zcdFfY4BuFMsIIBqpduLOVk5k6frv77VEhxqsATGbjI",        
        });
        setMapPlatform(platform);
        const defaultLayers = platform.createDefaultLayers();
        const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
            center: {lat: 0, lng: 0},
            zoom: 0,
            pixelRatio: window.devicePixelRatio || 1,
        });
        setMap(hMap);
        hMap.addEventListener('mapviewchange', handleMapViewChange);
        new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));
        return () => { hMap.dispose() };
    }, [mapRef]);

    return (
        <MapStyles ref={mapRef} style={{ height: "650px", width: "900px" }}></MapStyles>
    )
}


*/