import { Destination, DestinationDetailed } from "../generalTypes/apiResponse";
import { fetchData } from "./models/dataRequest";

type ResponseOptions = Destination | DestinationDetailed[];


export const fetchClickedDestination = async (coordinates: {lat: number, lng: number}): Promise<{destination: ResponseOptions}> => {
    return fetchData<{destination: ResponseOptions}>(
        "http://localhost:3000/api/destination-clicked", {
            method: "POST",
            body: JSON.stringify({
               coordinates
            })
        }
    )
}




