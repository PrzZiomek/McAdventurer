import { Schema, model } from "mongoose";

const DestinationsLanguagesSchema = new Schema({
   items: [
      {
         code: String,
         name: String,
         nativeName: String
      }
   ]   
});

export const DestinationsLanguages = model("DestinationsLanguages", DestinationsLanguagesSchema);

