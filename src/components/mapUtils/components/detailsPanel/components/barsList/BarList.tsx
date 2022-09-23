import React from "react";
import { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactSearchBox from "react-search-box";
import axios from "axios";

import { Coordinates } from "../../../../../../generalTypes/others";
import { Store } from "../../../../../../state/types";
import { List } from "../../../../../../ui/List";
import { Bar } from "./components/Bar";
import { Local } from "../../../../../../generalTypes/apiResponse";


interface BarListProps {
   mapClicked: boolean;
}


export const BarList: FC<BarListProps> = (props) => { 

   const [searchResults, setSearchResults] = useState<Local[] | undefined>([]);
   const [selectedPlace, setSelectedPlace] = useState<Local | undefined>();

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
      let response = await axios.get<{ results: Local[] }>(`${baseUrl}/${query}.json?${queryString}`).catch((err) => console.log(err));
      if(!response) return;
      return response.data.results;
   }

  const onSearchChange = async (query) => {
      if (query.length <= 0 &&
          !clickedDestCoords && !typedDestCoords) return;
      const coords: Coordinates = props.mapClicked ? clickedDestCoords : typedDestCoords;
      const results = await getBarsNearby({query, ...coords});  
      setSearchResults(results); console.log(results);
   }

   const setPlace = (key) =>{ console.log("???", searchResults?.slice(0,2));
      if(!searchResults) return;
      const selectedPlace = searchResults.find((p) => p.id === key);
      setSelectedPlace(selectedPlace);
    }

   const matchedResults = searchResults && searchResults
      .map(result => ({
         key: result.id,
         name: result.poi.name,
         dist: result.dist,
         value: `${result.poi.name} | ${(result.dist / 1000).toFixed(2)}km `
         }))
      .sort((a, b) => a.dist - b.dist);

   const allResults = searchResults && searchResults
      .map(result => ({
         key: result.id,
         name: result.poi.name,
         dist: result.dist,
         value: result.poi.name
      }))
      .sort((a, b) => a.dist - b.dist)
   console.log("selectedPlace", selectedPlace);
   
   const showBar = (): JSX.Element | null => selectedPlace ? <Bar data={selectedPlace} /> : null;

   return (
     <>
         <ReactSearchBox
            placeholder="Search for nearby bars"
            matchedRecords={matchedResults}
            data={allResults}
            onSelect={(place) => {console.log("place",place);return setPlace(place.item.key)}}
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