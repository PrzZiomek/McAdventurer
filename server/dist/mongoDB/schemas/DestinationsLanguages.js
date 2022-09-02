"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestinationsLanguages = void 0;
const mongoose_1 = require("mongoose");
const DestinationsLanguagesSchema = new mongoose_1.Schema({
    items: [
        {
            code: String,
            name: String,
            nativeName: String
        }
    ]
});
exports.DestinationsLanguages = (0, mongoose_1.model)("DestinationsLanguages", DestinationsLanguagesSchema);
//# sourceMappingURL=DestinationsLanguages.js.map