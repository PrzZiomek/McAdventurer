//import { Hmac } from "crypto";
import {useRef, MutableRefObject, useLayoutEffect} from "react";
import { useDispatch } from "react-redux";
import errorActionCreator from "../../../generalHandlers/errorActionCreator";

 
export function useCreateMap(mapRef: MutableRefObject<null>): [H.Map, H.service.Platform]{

   const hMapRef = useRef<H.Map>();

   const dispatch = useDispatch();

   const platform: H.service.Platform = new H.service.Platform({
      apikey: "zcdFfY4BuFMsIIBqpduLOVk5k6frv77VEhxqsATGbjI",        
   }); 

   useLayoutEffect(() =>{
      let hMap: H.Map;
      try{        
          if(!mapRef.current) throw new Error("the world map is not settled yet!");
          const defaultLayers = platform.createDefaultLayers();
          hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map); 
         hMap.addEventListener('mapviewchange',() => {});
         hMap.addEventListener('resize', () => hMap.getViewPort().resize());
         hMapRef.current = hMap;
         new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));  

         return () => { 
            hMap.dispose();
            hMap.removeEventListener('mapviewchange', mapviewchangeCb);
         };
      }
      catch(err){
         dispatch(errorActionCreator({
            message: `Error when setting hMap in ${useCreateMap.name}`,
            content: err as Error
          }))       
      } 
   }, [mapRef]); 
   
 return [hMapRef.current, platform]
}