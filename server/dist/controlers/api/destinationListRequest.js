"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destinationListRequest = void 0;
const enums_1 = require("../../models/enums");
const passInternalServerError_1 = require("../../models/error/passInternalServerError");
const passNotFoundError_1 = require("../../models/error/passNotFoundError");
const getCollection_1 = require("../../mongoDB/utils/getCollection");
const destinationListRequest = async (req, res, next) => {
    var _a;
    const destsColl = await (0, getCollection_1.getCollection)(enums_1.Collection.Destinations).catch(() => next((0, passNotFoundError_1.passNotFoundError)("db or destination collection not found")));
    const destsListRes = await (destsColl === null || destsColl === void 0 ? void 0 : destsColl.find({}).toArray().catch(() => next((0, passInternalServerError_1.passInternalServerError)("error when calling db for destinations list"))));
    const destinationsList = (_a = destsListRes[0]) === null || _a === void 0 ? void 0 : _a.items;
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