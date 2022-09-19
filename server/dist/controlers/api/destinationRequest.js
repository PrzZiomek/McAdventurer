"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destinationRequest = void 0;
const DestinationData_1 = require("../../models/DestinationData");
const enums_1 = require("../../models/enums");
const passInternalServerError_1 = require("../../models/error/passInternalServerError");
const destinationRequest = async (req, res, next) => {
    const name = req.body.destination.name.trim();
    let callWiki = false;
    const destinationData = new DestinationData_1.DestinationData();
    const destination = await destinationData.getOne(enums_1.Collection.WIKI_DESTINATIONS, { name }).catch(() => next((0, passInternalServerError_1.passInternalServerError)("error when looking for destination")));
    if (destination) {
        res.status(200).json({
            destination: {
                name: destination.name,
                content: destination.content,
                coordinates: {
                    lat: destination.coordinates.lat,
                    lng: destination.coordinates.lng
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