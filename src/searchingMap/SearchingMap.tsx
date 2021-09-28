import React, { useState } from "react"
import styled from "styled-components";

import { DestinationBrowser } from "../destinationsBrowser/DestinationsBrowser";
import { WorldMap } from "../worldMap/WorldMap";
import destinations from "../data/destinations.json";

const MapWrapper = styled.div`
    margin: auto;
    padding-top: 45px;
    width: 600px;
    height: 600px;
    background-color: rgba(0, 0, 0, 0.5);
    position: relative;
`;



export const SearchingMap: React.FC = () => {

    const [mapParams, setMapParams] =  useState<{ [x: string]: number; }>({
        zoom: 0,
        lat: 0,
        lng: 0  
    });

   const handleInputChange = (name: string, value: number) => {
          setMapParams({[name]:value})
    }
    
    return( 
        <MapWrapper>
            <DestinationBrowser countryNames={destinations.countries} />
            <WorldMap
               mapParams={mapParams}
               setMapPrams={setMapParams}
             />
        </MapWrapper>
    )

}