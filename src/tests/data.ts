import { Destination } from "../generalTypes/apiResponse";

export const destinations: Destination[] = [
   {country: 'United States', name: 'Friendswood', lat: '29.5111', lng: '-95.1979'},
   {country: 'United States', name: 'Frisco', lat: '33.1555', lng: '-96.8215'}   
];

export const coordinates = ({ lat: 20, lng: 52 });

export const geoPosition = {
   coords: {
      latitude: 20,
      longitude: 52
   }
}  

export const fetchDestinations = (): Promise<Destination[] | void> => Promise.resolve(destinations).catch(err => err);

export const fetchCoordinates = (): Promise<typeof geoPosition> => Promise.resolve(geoPosition); 
