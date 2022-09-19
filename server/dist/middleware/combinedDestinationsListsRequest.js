"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combinedDestinationsRequest = void 0;
const DestinationData_1 = require("../models/DestinationData");
const enums_1 = require("../models/enums");
const passInternalServerError_1 = require("../models/error/passInternalServerError");
// from destinationListRequest 
const combinedDestinationsRequest = async (req, res, next) => {
    const destinationsList = res.locals.destinationsList;
    const destinationData = new DestinationData_1.DestinationData();
    const checkedDestinations = await destinationData.getList(enums_1.Collection.WIKI_DESTINATIONS).catch(() => next((0, passInternalServerError_1.passInternalServerError)("error when looking for destinations list")));
    let mergedDestsList = [...destinationsList];
    if (checkedDestinations)
        mergedDestsList.concat(checkedDestinations);
    const combinedDestsLists = combineDests(mergedDestsList);
    res.locals.combinedDestsLists = combinedDestsLists;
    next();
};
exports.combinedDestinationsRequest = combinedDestinationsRequest;
function combineDests(dests) {
    return dests.reduce((acc, poz) => {
        var _a, _b, _c, _d;
        const obj = {
            country: (poz === null || poz === void 0 ? void 0 : poz.country) ? poz === null || poz === void 0 ? void 0 : poz.country : (poz === null || poz === void 0 ? void 0 : poz.content) && (poz === null || poz === void 0 ? void 0 : poz.content.slice(0, 20)),
            name: (poz === null || poz === void 0 ? void 0 : poz.name) ? poz === null || poz === void 0 ? void 0 : poz.name : poz === null || poz === void 0 ? void 0 : poz.city,
            lat: ((_a = poz === null || poz === void 0 ? void 0 : poz.coordinates) === null || _a === void 0 ? void 0 : _a.lat) ? (_b = poz === null || poz === void 0 ? void 0 : poz.coordinates) === null || _b === void 0 ? void 0 : _b.lat : "unknown",
            lng: ((_c = poz === null || poz === void 0 ? void 0 : poz.coordinates) === null || _c === void 0 ? void 0 : _c.lng) ? (_d = poz === null || poz === void 0 ? void 0 : poz.coordinates) === null || _d === void 0 ? void 0 : _d.lng : "unknown",
        };
        acc.push(obj);
        return acc;
    }, []);
}
// to languagesRequest
//# sourceMappingURL=combinedDestinationsListsRequest.js.map