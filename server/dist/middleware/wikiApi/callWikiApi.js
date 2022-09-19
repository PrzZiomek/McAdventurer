"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callWikiApi = void 0;
const DestinationData_1 = require("../../models/DestinationData");
const enums_1 = require("../../models/enums");
const passInternalServerError_1 = require("../../models/error/passInternalServerError");
const getDestinationData_1 = require("./getDestinationData");
// from destinationRequest
const callWikiApi = async (req, res, next) => {
    const name = res.locals.destinationName;
    const callWiki = res.locals.callWiki;
    let destination = { coordinates: null };
    if (!callWiki)
        return;
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${name}&prop=extracts|coordinates|pageimages&exintro&explaintext&format=json&exintro=1&indexpageids`;
    const destinationRes = await (0, getDestinationData_1.getDestinationData)(url).catch(err => next((0, passInternalServerError_1.passInternalServerError)("error when calling wiki api for destination")));
    const { title, extract, coordinates, pageimage } = destinationRes;
    const destinationData = new DestinationData_1.DestinationData();
    if (destinationRes) {
        destination = {
            name: title,
            content: extract,
            images: pageimage ? pageimage : "unset"
        };
    }
    if (coordinates) {
        destination = Object.assign(Object.assign({}, destination), { coordinates: {
                lat: coordinates[0].lat,
                lng: coordinates[0].lon
            } });
        await destinationData.setOne(enums_1.Collection.WIKI_DESTINATIONS, destination).catch(err => next((0, passInternalServerError_1.passInternalServerError)("error when adding destination to db")));
        res.status(200).json({ destination });
    }
    else {
        const destinationWithCoords = await destinationData.getOne(enums_1.Collection.DESTINATIONS, { name }).catch(() => next((0, passInternalServerError_1.passInternalServerError)("error when looking for destinations coords")));
        const coords = destinationWithCoords === null || destinationWithCoords === void 0 ? void 0 : destinationWithCoords.coordinates;
        if (coords &&
            coords.lat && coords.lng) {
            destination = Object.assign(Object.assign({}, destination), { coordinates: coords });
            res.status(200).json({ destination });
        }
        res.locals.destination = destination;
        next();
    }
};
exports.callWikiApi = callWikiApi;
// next to callPositionstackApi
//# sourceMappingURL=callWikiApi.js.map