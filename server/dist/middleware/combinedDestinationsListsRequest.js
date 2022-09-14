"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combinedDestinationsRequest = void 0;
const enums_1 = require("../models/enums");
const passInternalServerError_1 = require("../models/error/passInternalServerError");
const passNotFoundError_1 = require("../models/error/passNotFoundError");
const getCollection_1 = require("../mongoDB/utils/getCollection");
// from destinationListRequest 
const combinedDestinationsRequest = async (req, res, next) => {
    const destinationsList = res.locals.destinationsList;
    const destsColl = await (0, getCollection_1.getCollection)(enums_1.Collection.WIKI_DESTINATIONS).catch(() => next((0, passNotFoundError_1.passNotFoundError)("db or wiki destination collection not found")));
    const checkedDestsRes = await (destsColl === null || destsColl === void 0 ? void 0 : destsColl.find({}).toArray().catch(() => next((0, passInternalServerError_1.passInternalServerError)("error when calling db for destinations list"))));
    const checkedDestinations = checkedDestsRes[0].items;
    const mergedDestsList = [...destinationsList, ...checkedDestinations];
    const combinedDestsLists = combineDests(mergedDestsList);
    res.locals.combinedDestsLists = combinedDestsLists;
    next();
};
exports.combinedDestinationsRequest = combinedDestinationsRequest;
function combineDests(dests) {
    return dests.reduce((acc, poz) => {
        const obj = {
            country: (poz === null || poz === void 0 ? void 0 : poz.country) ? poz === null || poz === void 0 ? void 0 : poz.country : (poz === null || poz === void 0 ? void 0 : poz.content) && (poz === null || poz === void 0 ? void 0 : poz.content.slice(0, 20)),
            name: (poz === null || poz === void 0 ? void 0 : poz.name) ? poz === null || poz === void 0 ? void 0 : poz.name : poz === null || poz === void 0 ? void 0 : poz.city,
            lat: (poz === null || poz === void 0 ? void 0 : poz.coordinates.lat) ? poz === null || poz === void 0 ? void 0 : poz.coordinates.lat : "unknown",
            lng: (poz === null || poz === void 0 ? void 0 : poz.coordinates.lng) ? poz === null || poz === void 0 ? void 0 : poz.coordinates.lng : "unknown",
        };
        acc.push(obj);
        return acc;
    }, []);
}
// to languagesRequest
//# sourceMappingURL=combinedDestinationsListsRequest.js.map