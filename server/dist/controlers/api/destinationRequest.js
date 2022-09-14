"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destinationRequest = void 0;
const enums_1 = require("../../models/enums");
const passInternalServerError_1 = require("../../models/error/passInternalServerError");
const passNotFoundError_1 = require("../../models/error/passNotFoundError");
const getCollection_1 = require("../../mongoDB/utils/getCollection");
const destinationRequest = async (req, res, next) => {
    const name = req.body.destination.name.trim();
    let callWiki = false;
    const destsColl = await (0, getCollection_1.getCollection)(enums_1.Collection.WikiDestinations).catch(() => next((0, passNotFoundError_1.passNotFoundError)("db or wiki destination collection not found")));
    const destination = await (destsColl === null || destsColl === void 0 ? void 0 : destsColl.findOne({ name }).catch(err => next((0, passInternalServerError_1.passInternalServerError)("error when calling db for one destination"))));
    console.log("name", name);
    console.log("destination req", destination);
    if (destination) {
        res.status(200).json({
            destination: {
                name: destination.name,
                content: destination.content,
                coordinates: {
                    lat: destination.lat,
                    lng: destination.lng
                },
                images: destination.images
            },
        });
    }
    if (!destination) {
        callWiki = true;
    }
    res.locals.destinationName = req.body.destination.name;
    res.locals.callWiki = callWiki;
    next();
};
exports.destinationRequest = destinationRequest;
// next to callWikiApi
//# sourceMappingURL=destinationRequest.js.map