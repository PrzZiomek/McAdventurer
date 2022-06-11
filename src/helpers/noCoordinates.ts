import { Coordinates } from "../generalTypes/others";
import { isNotNumber } from "./isNotNumber";

export const noCoordinates = (coords: Coordinates) => {
   const equalZero: boolean = !coords.lat && !coords.lng;
   return equalZero || isNotNumber(coords?.lat);
}
