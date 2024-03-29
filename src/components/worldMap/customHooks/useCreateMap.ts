import {useRef, MutableRefObject, useLayoutEffect} from "react";
import { useDispatch } from "react-redux";
import errorActionCreator from "../../../generalHandlers/errorActionCreator";


export function useCreateMap(mapElement: MutableRefObject<null>): [H.Map | undefined, H.service.Platform | undefined]{

   const hMapRef = useRef<H.Map>() as MutableRefObject<H.Map>
   const platformRef = useRef<H.service.Platform>();
   const dispatch = useDispatch();

   useLayoutEffect(() =>{
      try{        
         if(!mapElement.current) throw new Error("the world map is not settled yet!");

         platformRef.current = new H.service.Platform({
            apikey: "zcdFfY4BuFMsIIBqpduLOVk5k6frv77VEhxqsATGbjI",        
         }); 

         const defaultLayers =  platformRef.current.createDefaultLayers();

         hMapRef.current = new H.Map(
            mapElement.current,
            defaultLayers.vector.normal.map,
            { zoom: 2 }
         ); 

         window.addEventListener('resize', () => hMapRef.current.getViewPort().resize());

         new H.mapevents.Behavior(new H.mapevents.MapEvents( hMapRef.current));  

         return () => { 
            hMapRef.current.dispose();
         };
      }
      catch(err){
         dispatch(errorActionCreator({
            message: `Error when setting hMap in ${useCreateMap.name}`,
            content: err as Error
          }))       
      } 
   }, [mapElement]); 
   
 return [hMapRef.current, platformRef.current];

}
