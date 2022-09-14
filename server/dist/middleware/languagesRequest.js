"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.languagesRequest = void 0;
const enums_1 = require("../models/enums");
const passInternalServerError_1 = require("../models/error/passInternalServerError");
const passNotFoundError_1 = require("../models/error/passNotFoundError");
const getCollection_1 = require("../mongoDB/utils/getCollection");
// from combinedDestinationsRequest 
const languagesRequest = async (req, res, next) => {
    const destinationList = res.locals.combinedDestsLists;
    const destsColl = await (0, getCollection_1.getCollection)(enums_1.Collection.DESTINATIONS_LANGUAGES).catch(() => next((0, passNotFoundError_1.passNotFoundError)("db or wiki destinations languages collection not found")));
    const destsLangRes = await (destsColl === null || destsColl === void 0 ? void 0 : destsColl.find({}).toArray().catch(() => next((0, passInternalServerError_1.passInternalServerError)("error when calling db for destinations languages"))));
    const destinationsLanguages = destsLangRes === null || destsLangRes === void 0 ? void 0 : destsLangRes[0].items;
    res.status(200).send({
        destinationList,
        destinationsLanguages
    });
    next();
};
exports.languagesRequest = languagesRequest;
//# sourceMappingURL=languagesRequest.js.map