"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.languagesRequest = void 0;
const DestinationData_1 = require("../models/DestinationData");
const enums_1 = require("../models/enums");
const passInternalServerError_1 = require("../models/error/passInternalServerError");
// from combinedDestinationsRequest 
const languagesRequest = async (req, res, next) => {
    const destinationList = res.locals.combinedDestsLists;
    const destinationData = new DestinationData_1.DestinationData();
    const destinationsLanguages = await destinationData.getList(enums_1.Collection.DESTINATIONS_LANGUAGES).catch(() => next((0, passInternalServerError_1.passInternalServerError)("error when looking for destinations list")));
    res.status(200).send({
        destinationList,
        destinationsLanguages
    });
    next();
};
exports.languagesRequest = languagesRequest;
//# sourceMappingURL=languagesRequest.js.map