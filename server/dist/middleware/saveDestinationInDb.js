"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveDestinationInDb = void 0;
const enums_1 = require("../models/enums");
const passInternalServerError_1 = require("../models/error/passInternalServerError");
const passNotFoundError_1 = require("../models/error/passNotFoundError");
const getCollection_1 = require("../mongoDB/utils/getCollection");
// from callWikiApi
const saveDestinationInDb = async (req, res, next) => {
    const callWiki = res.locals.callWiki;
    if (!callWiki)
        return;
    const { name, content, coordinates, images } = Object.assign({}, res.locals.destination);
    console.log("res.locals.destination in last", res.locals.destination);
    const destsColl = await (0, getCollection_1.getCollection)(enums_1.Collection.WIKI_DESTINATIONS).catch(() => next((0, passNotFoundError_1.passNotFoundError)("db or wiki destination collection not found")));
    const destinationSaved = await (destsColl === null || destsColl === void 0 ? void 0 : destsColl.insertOne(res.locals.destination).catch(() => next((0, passInternalServerError_1.passInternalServerError)("error when saving destination in db"))));
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