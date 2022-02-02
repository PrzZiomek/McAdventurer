"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveDestinationInDb = void 0;
const Destination_1 = require("../models/Destination");
// from callWikiApi
const saveDestinationInDb = async (req, res, next) => {
    const callWiki = res.locals.callWiki;
    if (!callWiki)
        return;
    const { name, content, coordinates, images } = res.locals.destination;
    const destinations = new Destination_1.Destinations();
    destinations.saveOne({
        name,
        content,
        coordinates,
        images
    });
    next();
};
exports.saveDestinationInDb = saveDestinationInDb;
//# sourceMappingURL=saveDestinationInDb.js.map