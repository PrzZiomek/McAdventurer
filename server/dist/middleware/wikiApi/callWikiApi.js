"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callWikiApi = void 0;
const errorHandle_1 = require("../../helpers/errorHandle");
const getDestinationData_1 = require("./getDestinationData");
// from destinationRequest
const callWikiApi = async (req, res, next) => {
    const name = res.locals.destinationName;
    const callWiki = res.locals.callWiki;
    if (!callWiki)
        return;
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${name}&prop=extracts|coordinates|pageimages&exintro&explaintext&format=json&exintro=1&indexpageids`;
    const destinationRes = await (0, getDestinationData_1.getDestinationData)(url).catch(err => next((0, errorHandle_1.errorHandle)(err, 500)));
    const { title, extract, coordinates, pageimage } = destinationRes;
    const destination = {
        name: title,
        content: extract,
        coordinates: {
            lat: coordinates ? coordinates[0].lat : "unset",
            lng: coordinates ? coordinates[0].lon : "unset"
        },
        images: pageimage ? pageimage : "unset"
    };
    res.locals.destination = destination;
    next();
};
exports.callWikiApi = callWikiApi;
// next to callPositionstackApi
//# sourceMappingURL=callWikiApi.js.map