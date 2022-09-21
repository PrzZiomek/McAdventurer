import React from "react";
import { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactSearchBox from "react-search-box";
import axios from "axios";

import { Coordinates } from "../../../../../../generalTypes/others";
import { Store } from "../../../../../../state/types";
import { List } from "../../../../../../ui/List";
import { Bar } from "./components/Bar";


interface BarListProps {
   mapClicked: boolean;
}

interface Bar {
   address: {
      country: "United States"
      countryCode: "US";
      countryCodeISO3: "USA";
      countrySecondarySubdivision: "Okaloosa";
      countrySubdivision: "FL";
      countrySubdivisionName: "Florida";
      freeformAddress: "745 Beal Parkway Northwest, Fort Walton Beach, FL 32547";
      localName: "Fort Walton Beach";
      municipality: "Fort Walton Beach";
      postalCode: "32547";
      streetName: "Beal Parkway Northwest";
      streetNumber: "745";
   };
   dist: 753.3724431347536;
   entryPoints:{ 
      type: "main";
      position: Coordinates
   }[];
   id: "840121001299424";
   info: "search:ta:840121001299424-US";
   poi: {
      brands: {name: "McDonald's"};
      categories: string[];
      categorySet : [{id: 9376006}];
      classifications : [{code: 'CAFE_PUB', names: {nameLocale: 'en-US', name: 'coffee shop'}}];
      name: "McCafé";
      phone: "+48 539 983 186";
      url: "mccafe.mcdonalds.pl/";
   };
   position: Coordinates;
   score: 2.574344635;
   type: "POI";
   viewport: {
      btmRightPoint: Coordinates;
      topLeftPoint: Coordinates;
   };
}


export const BarList: FC<BarListProps> = (props) => { 

   const [searchResults, setSearchResults] = useState([]);
   const [selectedPlace, setSelectedPlace] = useState();

   const typedDestCoords: Coordinates | undefined = useSelector((state: Store) => { 
      if(state.getDestination.loading !== false) return; 
      return state.getDestination.data.coordinates;                                                                                                                                        //setDestination(state.getDestination.destination)  
   });

   const clickedDestCoords: Coordinates | undefined = useSelector((state: Store) => { 
      if(state.getClickedDestination.loading !== false) return; 
      return state.getClickedDestination.data.coordinates;                                                                                                                                        //setDestination(state.getDestination.destination)  
   });

   const getBarsNearby = async ({ query, lat, lng, limit = 20, radius = 10000 }) => { 
      let baseUrl = 'https://api.tomtom.com/search/2/poiSearch'; 
      let queryString = `limit=${limit}&lat=${lat}&lon=${lng}&radius=${radius}&key=3HzsXWuQLWDL2hbJw9IJKNpwXpcx4NJG`;
      let response = await axios.get(`${baseUrl}/${query}.json?${queryString}`).catch((err) => console.log(err));
      return response.data.results;
   }

  const onSearchChange = async (query) => {
      if (query.length <= 0 &&
          !clickedDestCoords && !typedDestCoords) return;
      const coords: Coordinates = props.mapClicked ? clickedDestCoords : typedDestCoords;
      const results = await getBarsNearby({query, ...coords});  
      setSearchResults(results); console.log(results);
   }

   const setPlace = (key) =>{
      const selectedPlace = searchResults.find((p) => p.id === key);
      setSelectedPlace(selectedPlace);
    }

   const matchedResults = searchResults
      .map(result => ({
         key: result.id,
         name: result.poi.name,
         dist: result.dist,
         value: `${result.poi.name} | ${(result.dist / 1000).toFixed(2)}km `
         }))
      .sort((a, b) => a.dist - b.dist);

   const allResults = searchResults
      .map(result => ({
         key: result.id,
         name: result.poi.name,
         dist: result.dist,
         value: result.poi.name
      }))
      .sort((a, b) => a.dist - b.dist)
   
   const showBar = (): JSX.Element | null => selectedPlace ? <Bar data={selectedPlace} /> : null;

   return (
     <>
         <ReactSearchBox
            placeholder="Search for nearby bars"
            matchedRecords={matchedResults}
            data={allResults}
            onSelect={(place) => setPlace(place)}
            autoFocus={true}
            onChange={(query) => onSearchChange(query)}
            fuseConfigs={{
            minMatchCharLength: 0,
            threshold: 1,
            distance: 100000,
            sort: false
            }}
            keys = {['name']}
         />
         {showBar()}
     </>
   );

}