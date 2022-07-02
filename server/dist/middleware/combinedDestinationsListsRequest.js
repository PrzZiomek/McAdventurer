"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combinedDestinationsRequest = void 0;
const errorHandle_1 = require("../helpers/errorHandle");
const Destination_1 = require("../models/Destination");
const enums_1 = require("../models/enums");
// from destinationListRequest 
const combinedDestinationsRequest = async (req, res, next) => {
    const destinationsList = res.locals.destinationsList;
    const destination = new Destination_1.Destinations();
    const checkedDestinations = await destination
        .getAll(enums_1.Table.Destination)
        .catch(err => next((0, errorHandle_1.errorHandle)(err, 500)));
    if (!checkedDestinations) {
        return res.status(422).send({
            message: "database connection error"
        });
    }
    const mergedDestsList = [...destinationsList, ...checkedDestinations];
    const combinedDestsLists = combineDests(mergedDestsList);
    //console.log("combinedDestsLists", combinedDestsLists);  
    res.status(200).send(combinedDestsLists);
};
exports.combinedDestinationsRequest = combinedDestinationsRequest;
function combineDests(dests) {
    return dests.reduce((acc, poz) => {
        const obj = {
            country: poz.COUNTRY ? poz.COUNTRY : poz.CONTENT.slice(0, 20),
            name: (poz === null || poz === void 0 ? void 0 : poz.NAME) ? poz === null || poz === void 0 ? void 0 : poz.NAME : poz === null || poz === void 0 ? void 0 : poz.CITY,
            lat: (poz === null || poz === void 0 ? void 0 : poz.LAT) ? poz === null || poz === void 0 ? void 0 : poz.LAT : (poz === null || poz === void 0 ? void 0 : poz.LAT) ? poz === null || poz === void 0 ? void 0 : poz.LAT : "unset",
            lng: poz.LNG ? poz.LNG : (poz === null || poz === void 0 ? void 0 : poz.LNG) ? poz === null || poz === void 0 ? void 0 : poz.LNG : "unset",
        };
        acc.push(obj);
        return acc;
    }, []);
}
//# sourceMappingURL=combinedDestinationsListsRequest.js.map