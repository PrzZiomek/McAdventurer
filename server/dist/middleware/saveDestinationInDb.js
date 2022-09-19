"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveDestinationInDb = void 0;
const DestinationData_1 = require("../models/DestinationData");
const enums_1 = require("../models/enums");
const passInternalServerError_1 = require("../models/error/passInternalServerError");
// from callWikiApi
const saveDestinationInDb = async (req, res, next) => {
    const callWiki = res.locals.callWiki;
    if (!callWiki)
        return;
    const { name, content, coordinates, images } = Object.assign({}, res.locals.destination);
    const destinationData = new DestinationData_1.DestinationData();
    console.log("res.locals.destination in last", res.locals.destination);
    await destinationData.setOne(enums_1.Collection.WIKI_DESTINATIONS, res.locals.destination).catch(err => next((0, passInternalServerError_1.passInternalServerError)("error when saving destination in db")));
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