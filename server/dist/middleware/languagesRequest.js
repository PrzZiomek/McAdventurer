"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.languagesRequest = void 0;
const errorHandle_1 = require("../helpers/errorHandle");
const enums_1 = require("../models/enums");
const getCollection_1 = require("../mongoDB/utils/getCollection");
// from combinedDestinationsRequest 
const languagesRequest = async (req, res, next) => {
    const destinationList = res.locals.combinedDestsLists;
    const destsColl = await (0, getCollection_1.getCollection)(enums_1.Collection.DestinationsLanguages);
    const destsLangRes = await destsColl.find({}).toArray().catch(err => (0, errorHandle_1.errorHandle)(err, 500));
    const destinationsLanguages = destsLangRes[0].items;
    res.status(200).send({
        destinationList,
        destinationsLanguages
    });
};
exports.languagesRequest = languagesRequest;
//# sourceMappingURL=languagesRequest.js.map