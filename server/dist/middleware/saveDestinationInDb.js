"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveDestinationInDb = void 0;
const errorHandle_1 = require("../helpers/errorHandle");
const enums_1 = require("../models/enums");
const getCollection_1 = require("../mongoDB/utils/getCollection");
// from callWikiApi
const saveDestinationInDb = async (req, res, next) => {
    const callWiki = res.locals.callWiki;
    if (!callWiki)
        return;
    const { name, content, coordinates, images } = Object.assign({}, res.locals.destination);
    console.log("res.locals.destination in last", res.locals.destination);
    const destsColl = await (0, getCollection_1.getCollection)(enums_1.Collection.WikiDestinations);
    const destinationSaved = await destsColl.insertOne(res.locals.destination).catch(err => (0, errorHandle_1.errorHandle)(err, 500));
    if (!coordinates) {
        res.status(200).json({
            destination: {
                name,
                content,
            },
        });
    }
    else if (coordinates.lat || coordinates.lng) {
        res.status(200).json({
            destination: {
                name,
                content,
                coordinates
            },
        });
    }
};
exports.saveDestinationInDb = saveDestinationInDb;
//# sourceMappingURL=saveDestinationInDb.js.map