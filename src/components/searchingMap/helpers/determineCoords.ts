import { DestinationNameAndPos, WikiDestination } from "../../../generalTypes/apiResponse";
import { NumbOrStr } from "../../../generalTypes/others";


export const determineCoords = (destination: WikiDestination, destinationList: DestinationNameAndPos[]): { lat: number, lng: number } => {

   const { coordinates } = destination;
   let lat: NumbOrStr = coordinates?.lat;
   let lng: NumbOrStr = coordinates?.lng;  

   if((isNotNumber(coordinates.lat) || isNotNumber(coordinates.lng))){                                                                                                                                                                                                                                                                                                                                                           
      const dest = destinationList.find(dest => dest.name === destination.name);
     if(dest) {
      const latNumb: number = isNotNumber(dest?.lat) ? 0 : dest?.lat as number;        
      const lngNumb: number = isNotNumber(dest?.lat) ? 0 : dest?.lat as number;      
      lat = latNumb;
      lng = lngNumb; 
     } 
   };

   return { lat, lng };
}



function isNotNumber(val: number | string): boolean{
   return (!val || isNaN(val as any));
} 