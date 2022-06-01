import { Destination } from "../generalTypes/apiResponse";
import { fetchData } from "./models/dataRequest";



export const fetchDestination = async (name: string): Promise<{destination: Destination | undefined}> => {
    return fetchData<{destination: Destination}>(
        "http://localhost:3000/api/destination", {
            method: "POST",
            body: JSON.stringify({
                destination: { name }
            })
        }
    )
}







