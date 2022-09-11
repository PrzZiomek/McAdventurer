"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callWikiApi = void 0;
const errorHandle_1 = require("../../helpers/errorHandle");
const Destination_1 = require("../../models/Destination");
const enums_1 = require("../../models/enums");
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
    const destinationRes = await (0, getDestinationData_1.getDestinationData)(url).catch(err => next((0, errorHandle_1.errorHandle)(err, 500)));
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
        const destsColl = await (0, getCollection_1.getCollection)(enums_1.Collection.WikiDestinations);
        const destinationSaved = await destsColl.insertOne(destination).catch(err => (0, errorHandle_1.errorHandle)(err, 500));
        res.status(200).json({ destination });
    }
    else {
        const destsColl = await (0, getCollection_1.getCollection)(enums_1.Collection.Destinations);
        const destinationWithCoords = await destsColl.findOne({ name }).catch(err => (0, errorHandle_1.errorHandle)(err, 500));
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