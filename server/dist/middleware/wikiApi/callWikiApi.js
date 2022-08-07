"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callWikiApi = void 0;
const errorHandle_1 = require("../../helpers/errorHandle");
const Destination_1 = require("../../models/Destination");
const getDestinationData_1 = require("./getDestinationData");
// from destinationRequest
const callWikiApi = async (req, res, next) => {
    const name = res.locals.destinationName;
    const callWiki = res.locals.callWiki;
    const destAction = new Destination_1.Destinations();
    const coords = { lat: "", lon: "" };
    let destination = { coordinates: null };
    if (!callWiki)
        return;
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${name}&prop=extracts|coordinates|pageimages&exintro&explaintext&format=json&exintro=1&indexpageids`;
    const destinationRes = await (0, getDestinationData_1.getDestinationData)(url).catch(err => next((0, errorHandle_1.errorHandle)(err, 500)));
    console.log("wikiSest@@@", destinationRes);
    const { title, extract, coordinates, pageimage } = destinationRes;
    if (destinationRes) {
        destination = {
            name: title,
            content: extract,
            images: pageimage ? pageimage : "unset"
        };
    }
    if (coordinates) {
        destination = Object.assign(Object.assign({}, destination), { coordinates: {
                lat: coordinates[0].lat || coords.lat,
                lng: coordinates[0].lon || coords.lat
            } });
        res.status(200).json({ destination });
    }
    const destinationCoords = await destAction.getOneCoords(name).catch(err => next((0, errorHandle_1.errorHandle)(err, 500)));
    if ((destinationCoords === null || destinationCoords === void 0 ? void 0 : destinationCoords.lat) && (destinationCoords === null || destinationCoords === void 0 ? void 0 : destinationCoords.lng)) {
        destination = Object.assign(Object.assign({}, destination), { coordinates: {
                lat: destinationCoords.lat,
                lng: destinationCoords.lng
            } });
        res.status(200).json({ destination });
    }
    console.log("coords from getonecords", coords);
    res.locals.destination = destination;
    next();
};
exports.callWikiApi = callWikiApi;
// next to callPositionstackApi
//# sourceMappingURL=callWikiApi.js.map