import { Coordinates } from "./others";

export interface Destination {
   name: string;
   country: string;
   coordinates: {
      lat: string | number;
      lng: string | number;
   }
}

export interface WikiDestination {
   type?: "WikiDestination";
   content: string,
   images: string,
   coordinates: {
      lat: number,
      lng: number,
   }
   name: string
};

export interface DestinationDetailed {
   name: string,
   region: string,
   county: string,
   locality: string,
   country: string,
   label: string
 }
 
 export interface Language{
   code: string,
   name: string,
   nativeName: string,
 }

 export interface Local {
   address: {
      country: string;
      countryCode: string;
      countryCodeISO3: string;
      countrySecondarySubdivision: string;
      countrySubdivision: string;
      countrySubdivisionName: string;
      freeformAddress: string;
      localName: string;
      municipality:string;
      postalCode: string;
      streetName: string;
      streetNumber: string;
   };
   dist: number;
   entryPoints:{ 
      type: string;
      position: Coordinates;
   }[];
   id: string;
   info: string;
   poi: {
      brands: {name: string};
      categories: string[];
      categorySet : {id: number}[];
      classifications : {
         code: string;
         names: { nameLocale: string; name: string }
      }[];
      name: string;
      phone: string;
      url: string;
   };
   position: Coordinates;
   score: number;
   type: string;
   viewport: {
      btmRightPoint: Coordinates;
      topLeftPoint: Coordinates;
   };
}