import {useRef, MutableRefObject, useLayoutEffect} from "react";
import { useDispatch } from "react-redux";
import errorActionCreator from "../../../generalHandlers/errorActionCreator";

 
export function useCreateMap(mapRef: MutableRefObject<null>): [H.Map | undefined, H.service.Platform | undefined]{

   const hMapRef = useRef<H.Map>();
   const platformRef = useRef<H.service.Platform>();
   const dispatch = useDispatch();

   useLayoutEffect(() =>{
      let hMap: H.Map;
      try{        
         if(!mapRef.current) throw new Error("the world map is not settled yet!");
         platformRef.current = new H.service.Platform({
            apikey: "zcdFfY4BuFMsIIBqpduLOVk5k6frv77VEhxqsATGbjI",        
         }); 
         const defaultLayers =  platformRef.current.createDefaultLayers();
         hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map); 
         hMap.addEventListener('resize', () => hMap.getViewPort().resize());
         hMapRef.current = hMap;
         new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));  

         return () => { 
            hMap.dispose();
         };
      }
      catch(err){
         dispatch(errorActionCreator({
            message: `Error when setting hMap in ${useCreateMap.name}`,
            content: err as Error
          }))       
      } 
   }, [mapRef]); 
   
 return [hMapRef.current, platformRef.current]
}