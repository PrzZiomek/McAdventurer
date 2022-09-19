"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destinationListRequest = void 0;
const DestinationData_1 = require("../../models/DestinationData");
const enums_1 = require("../../models/enums");
const passInternalServerError_1 = require("../../models/error/passInternalServerError");
const destinationListRequest = async (req, res, next) => {
    const destinationData = new DestinationData_1.DestinationData();
    const destinationsList = await destinationData.getList(enums_1.Collection.DESTINATIONS).catch(() => next((0, passInternalServerError_1.passInternalServerError)("error when looking for destinations list")));
    if (!destinationsList) {
        return res.status(422).send({
            message: "database connection error"
        });
    }
    ;
    res.locals.destinationsList = destinationsList;
    next();
};
exports.destinationListRequest = destinationListRequest;
// next to combinedDestinationsRequest
//# sourceMappingURL=destinationListRequest.js.map