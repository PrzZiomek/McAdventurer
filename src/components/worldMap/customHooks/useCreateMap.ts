import { Hmac } from "crypto";
import {useRef, MutableRefObject, useLayoutEffect} from "react";

 
export function useCreateMap(mapRef: MutableRefObject<null>, [ mapviewchangeCb ]: [mapviewchangeCb: EventListenerOrEventListenerObject]){

   const hMapRef = useRef<H.Map>();

   useLayoutEffect(() =>{
      if(!mapRef.current) return;
      const platform  = new H.service.Platform({
         apikey: "zcdFfY4BuFMsIIBqpduLOVk5k6frv77VEhxqsATGbjI",        
         }); 
      const defaultLayers = platform.createDefaultLayers();
      const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
            center: {lat: 0, lng: 0},
            zoom: 0,
            pixelRatio: window.devicePixelRatio || 1,
      }); 
      hMap.addEventListener('mapviewchange',() => {});
      hMap.addEventListener('resize', () => hMap.getViewPort().resize());
      hMapRef.current = hMap;
      new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));   
      return () => { 
         hMap.dispose();
         hMap.removeEventListener('mapviewchange', mapviewchangeCb);
      };
   }, [mapRef]);

 return [hMapRef.current]
}