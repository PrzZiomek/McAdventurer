export interface Destination {
   type?: "Destination";
   NAME: string;
   CONTENT: string;
   LAT: number | string,
   LNG: number | string,
   IMAGES: string
}

export interface AllDestination {
    type?: "AllDestination";
    CITY: string;
    COUNTRY: string;
    LAT: string;
    LNG: string;
}

export interface DestinationTransitType {
    content?: string,
    images?: string, 
    coordinates?: {
      lat: number | string,
      lng: number | string
    }
    name?: string 
  }

export interface DestinationNameAndPosition {
    name: string
    lat: string | number,
    lng: string | number,
}

export interface WikiPage {
   pageid: number;
   ns: number;
   title: string;
   extract: string;
   coordinates: [
       {
           lat: number;
           lon: number;
       }
   ];
   pageimage: string;
}

export interface Locals {
    destinationName: string;
    callWiki: boolean;
    destination: DestinationTransitType;
    destinationsList: DestinationModel[];
    coordinates: {lat: string, lng: string};
    combinedDestsLists: DestinationModel[] & WikiDestinationModel[];
  }

  
export interface DestinationModel {
  city: string;
  country: string;
  coordinates: {
     lat: number;
     lng: number;
  }
}

export interface WikiDestinationModel {
  name: string;
  content: string;
  images: string;
  coordinates: {
    lat: number;
    lng: number;
 }
}

export interface LanguagesModel{
  code: string,
  name: string,
  nativeName: string
}

