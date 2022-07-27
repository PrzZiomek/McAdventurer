import { FC, useEffect, useState } from "react";

import { Destination } from "../../../../generalTypes/apiResponse";
import { DestinationBrowser } from "../../../destinationsBrowser/DestinationsBrowser";
import { MenuPanel } from "./components/menuPanel/MenuPanel";


export interface UtilsTopSectionProps {
   destinations: Destination[] | undefined;
}

export const UtilsTopSection: FC<UtilsTopSectionProps> = (props) => {

   const [mQuery, setMQuery] = useState({
      matches: window.innerWidth > 768 ? true : false,
   });

   useEffect(() => {
      const mediaQuery = window.matchMedia("(min-width: 768px)");
      mediaQuery.addEventListener("change", setMQuery);
 
      return () => mediaQuery.removeEventListener("change", setMQuery)
   }, []);

   return(
            <>
               <DestinationBrowser
                  destinations={props.destinations}
                  device={mQuery && !mQuery.matches ? "mobile" : "desktop"}
               />
               <MenuPanel device={mQuery && !mQuery.matches ? "mobile" : "desktop"} />
            </>
         )
          
}