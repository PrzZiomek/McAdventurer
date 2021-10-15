import React, { useState, FC, useEffect } from "react"
import styled from "styled-components";
import { I } from "./models/types/interfaces";


export const MapStyles = styled.div`

   margin-left: -25px;
   height: 100vh;
   min-width: 70vw;
   flex-grow: 1;
   
   canvas{
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
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
      if(map && layer) map.setBaseLayer(layer); console.log("layer",layer);
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
        hMap.addEventListener('mapviewchange',() => props.handleMapViewChange);
        new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));
        return () => { hMap.dispose() };
    }, [mapRef]);

    return (
      <MapStyles ref={mapRef} style={{  }}></MapStyles>
    )
  }
/*
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
        const platform = props.mapPlatform();
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


*/


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








*/