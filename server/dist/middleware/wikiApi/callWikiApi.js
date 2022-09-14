"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callWikiApi = void 0;
const Destination_1 = require("../../models/Destination");
const enums_1 = require("../../models/enums");
const passInternalServerError_1 = require("../../models/error/passInternalServerError");
const passNotFoundError_1 = require("../../models/error/passNotFoundError");
const getCollection_1 = require("../../mongoDB/utils/getCollection");
const getDestinationData_1 = require("./getDestinationData");
// from destinationRequest
const callWikiApi = async (req, res, next) => {
    const name = res.locals.destinationName;
    const callWiki = res.locals.callWiki;
    const destAction = new Destination_1.Destinations();
    let destination = { coordinates: null };
    if (!callWiki)
        return;
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${name}&prop=extracts|coordinates|pageimages&exintro&explaintext&format=json&exintro=1&indexpageids`;
    const destinationRes = await (0, getDestinationData_1.getDestinationData)(url).catch(err => next((0, passInternalServerError_1.passInternalServerError)("error when calling wiki api for destination")));
    const { title, extract, coordinates, pageimage } = destinationRes;
    console.log("from wiki", destinationRes);
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
        const destsColl = await (0, getCollection_1.getCollection)(enums_1.Collection.WIKI_DESTINATIONS).catch(() => next((0, passNotFoundError_1.passNotFoundError)("db or wiki destination collection not found")));
        const destinationSaved = await (destsColl === null || destsColl === void 0 ? void 0 : destsColl.insertOne(destination).catch(err => next((0, passInternalServerError_1.passInternalServerError)("error when inserting destination db"))));
        res.status(200).json({ destination });
    }
    else {
        const destsColl = await (0, getCollection_1.getCollection)(enums_1.Collection.DESTINATIONS).catch(() => next((0, passNotFoundError_1.passNotFoundError)("db or wiki destination collection not found")));
        const destinationWithCoords = await (destsColl === null || destsColl === void 0 ? void 0 : destsColl.findOne({ name }).catch(() => next((0, passInternalServerError_1.passInternalServerError)("error when calling db for destination"))));
        console.log("destination cord", destination);
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