"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combinedDestinationsRequest = void 0;
const errorHandle_1 = require("../helpers/errorHandle");
const enums_1 = require("../models/enums");
const getCollection_1 = require("../mongoDB/utils/getCollection");
// from destinationListRequest 
const combinedDestinationsRequest = async (req, res, next) => {
    const destinationsList = res.locals.destinationsList;
    const destsColl = await (0, getCollection_1.getCollection)(enums_1.Collection.WikiDestinations);
    const checkedDestsRes = await destsColl.find({}).toArray().catch(err => (0, errorHandle_1.errorHandle)(err, 500));
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
/*  country: poz.COUNTRY ? poz.COUNTRY : poz?.CONTENT.slice(0, 20),
          name: poz?.NAME ? poz?.NAME : poz?.CITY,
          lat: poz?.LAT ? poz?.LAT : poz?.LAT ? poz?.LAT : "unset",
          lng: poz.LNG ? poz.LNG : poz?.LNG ? poz?.LNG : "unset",
          */ 
//# sourceMappingURL=combinedDestinationsListsRequest.js.map