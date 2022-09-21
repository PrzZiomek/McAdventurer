"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destinationRequest = void 0;
const DestinationData_1 = require("../../models/DestinationData");
const enums_1 = require("../../models/enums");
const passInternalServerError_1 = require("../../models/error/passInternalServerError");
const destinationRequest = async (req, res, next) => {
    var _a, _b, _c, _d;
    const name = req.body.destination.name.trim();
    let callWiki = false;
    const destinationData = new DestinationData_1.DestinationData();
    const destination = await destinationData.getOne(enums_1.Collection.WIKI_DESTINATIONS, { name }).catch(() => next((0, passInternalServerError_1.passInternalServerError)("error when looking for destination")));
    const areCoordsSet = ((_a = destination === null || destination === void 0 ? void 0 : destination.coordinates) === null || _a === void 0 ? void 0 : _a.lat) || ((_b = destination === null || destination === void 0 ? void 0 : destination.coordinates) === null || _b === void 0 ? void 0 : _b.lng);
    if (destination && areCoordsSet) {
        res.status(200).json({
            destination: {
                name: destination.name,
                content: destination.content,
                coordinates: {
                    lat: (_c = destination.coordinates) === null || _c === void 0 ? void 0 : _c.lat,
                    lng: (_d = destination.coordinates) === null || _d === void 0 ? void 0 : _d.lng,
                },
                images: destination.images
            },
        });
    }
    if (!destination || !areCoordsSet) {
        callWiki = true;
    }
    res.locals.destinationName = req.body.destination.name;
    res.locals.callWiki = callWiki;
    next();
};
exports.destinationRequest = destinationRequest;
// next to callWikiApi
//# sourceMappingURL=destinationRequest.js.map