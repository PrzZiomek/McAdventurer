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