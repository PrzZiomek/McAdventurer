import { Schema, model } from "mongoose";


const DestinationsSchema = new Schema({
   items: [
      {
         city: String,
         country: String,
         coordinates: {
            lat: Number,
            lng: Number
         }
      }
   ]   
});

export const Destinations = model("Destinations", DestinationsSchema);

