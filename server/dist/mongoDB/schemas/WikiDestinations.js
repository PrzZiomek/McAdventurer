"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WikiDestinations = void 0;
const mongoose_1 = require("mongoose");
const WikiDestinationsSchema = new mongoose_1.Schema({
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
exports.WikiDestinations = (0, mongoose_1.model)("WikiDestinations", WikiDestinationsSchema);
//# sourceMappingURL=WikiDestinations.js.map