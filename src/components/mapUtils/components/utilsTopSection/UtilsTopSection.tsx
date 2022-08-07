import React, { FC, NamedExoticComponent, useEffect, useMemo, useState } from "react";

import { Destination } from "../../../../generalTypes/apiResponse";
import { DestinationBrowser } from "../../../destinationsBrowser/DestinationsBrowser";
import { MenuPanel } from "./components/menuPanel/MenuPanel";


export interface UtilsTopSectionProps {
   destinations: Destination[] | undefined;
}

type Device = "mobile" | "desktop";


 const UtilsTopSection: FC<UtilsTopSectionProps> = (props) => {

   const [mQuery, setMQuery] = useState({
      matches: window.innerWidth > 768 ? true : false,
   });

   useEffect(() => {
      const mediaQuery = window.matchMedia("(min-width: 768px)");
      mediaQuery.addEventListener("change", setMQuery);
 
      return () => mediaQuery.removeEventListener("change", setMQuery)
   }, []);

   const deviceType: Device = mQuery && !mQuery.matches ? "mobile" : "desktop";

   const memoizedMenuPanel: JSX.Element = useMemo(() => ( 
     <MenuPanel device={deviceType} /> 
   ), [deviceType])
   
   return (
      <>
         <DestinationBrowser
            destinations={props.destinations}
            device={deviceType}
         />
         {memoizedMenuPanel}
      </>
   )
          
}

export const UtilsTopSectionMemo: NamedExoticComponent<UtilsTopSectionProps> = React.memo(UtilsTopSection);