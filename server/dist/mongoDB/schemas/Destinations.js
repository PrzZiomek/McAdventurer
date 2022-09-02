"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Destinations = void 0;
const mongoose_1 = require("mongoose");
const DestinationsSchema = new mongoose_1.Schema({
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
exports.Destinations = (0, mongoose_1.model)("Destinations", DestinationsSchema);
//# sourceMappingURL=Destinations.js.map