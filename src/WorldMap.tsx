import React from "react"
import styled from "styled-components";

import { DestinationBrowser } from "./destinationsBrowser/DestinationsBrowser";
import { MapOfWorld } from "./MapOfWorld";
import destinations from "./data/destinations.json";

const MapWrapper = styled.div`
    margin: auto;
    padding-top: calc(50vh - 300px);
    width: 600px;
    height: 600px;
    background-color: rgba(0, 0, 0, 0.5);
    position: relative;
`;



export const WorldMap: React.FC = () => {

    return (
        <MapWrapper>
            <DestinationBrowser countryNames={destinations.countries} />
            <MapOfWorld />
        </MapWrapper>
    )
}