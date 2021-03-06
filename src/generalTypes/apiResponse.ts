export interface Destination {
   name: string;
   country: string;
   lat: string | number;
   lng: string | number;
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
 