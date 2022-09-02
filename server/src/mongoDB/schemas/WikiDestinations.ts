import { Schema, model } from "mongoose";

const WikiDestinationsSchema = new Schema({
   items: [
      {
         name: String,
         content: String,
         images: String,
         coordinates: {
            lat: Number,
            lng: Number
         }
      }
   ]   
});

export const WikiDestinations = model("WikiDestinations", WikiDestinationsSchema);



