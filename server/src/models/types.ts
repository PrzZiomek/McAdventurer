export interface Destination {
   type?: "Destination";
   name: string;
   content: string;
   coordinates: {
       lat: number | string,
       lng: number | string,
   };
   images: string
}

export interface AllDestination {
 type?: "AllDestination";
 city: string;
 country: string;
 lat: string;
 lng: string;
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
    destination: Destination;
    destinationsList: AllDestination[] | Destination[];
  
  }