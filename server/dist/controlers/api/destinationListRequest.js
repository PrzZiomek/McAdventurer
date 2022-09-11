"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destinationListRequest = void 0;
const errorHandle_1 = require("../../helpers/errorHandle");
const enums_1 = require("../../models/enums");
const getCollection_1 = require("../../mongoDB/utils/getCollection");
const destinationListRequest = async (req, res, next) => {
    var _a;
    const destsColl = await (0, getCollection_1.getCollection)(enums_1.Collection.Destinations);
    const destsListRes = await destsColl.find({}).toArray().catch(err => (0, errorHandle_1.errorHandle)(err, 500));
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