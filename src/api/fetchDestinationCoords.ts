import { Destination } from "../generalTypes/apiResponse";
import { fetchData } from "./models/dataRequest";


export const fetchDestinationCoords = async (coords: {lat: number, lng: number}): Promise<{destination: Destination | undefined}> => {
    return fetchData<{destination: Destination}>(
        "http://localhost:3000/api/destination-coordinates", {
            method: "POST",
            body: JSON.stringify({
               coords
            })
        }
    )
}




