"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callPositionstackApi = void 0;
const axios_1 = __importDefault(require("axios"));
const passInternalServerError_1 = require("../models/error/passInternalServerError");
const callPositionstackApi = async (req, res, next) => {
    var _a, _b, _c, _d;
    const destination = res.locals.destination;
    const hasDestinationCoords = (((_a = destination.coordinates) === null || _a === void 0 ? void 0 : _a.lat) !== "unset" ||
        !((_b = destination.coordinates) === null || _b === void 0 ? void 0 : _b.lat)) ||
        (((_c = destination.coordinates) === null || _c === void 0 ? void 0 : _c.lng) !== "unset" || !((_d = destination.coordinates) === null || _d === void 0 ? void 0 : _d.lng));
    if (!hasDestinationCoords) {
        const params = {
            access_key: '8b7251d9992206506bbf41cdf3c3dd13',
            query: destination.name
        };
        const destinationRes = await axios_1.default.get("http://api.positionstack.com/v1/forward", { params })
            .catch(err => next((0, passInternalServerError_1.passInternalServerError)("error when calling positionstack api")));
        console.log("callPositionstackApi", destinationRes);
        const firstDest = destinationRes === null || destinationRes === void 0 ? void 0 : destinationRes.data.data[0]; // to do - support of multiple same name destinations handling!
        res.locals.destination = {
            content: `${firstDest.region ? firstDest.region : ""}, ${firstDest.county ? firstDest.county : ""}`,
            name: firstDest.name,
            coordinates: {
                lat: firstDest.latitude,
                lng: firstDest.longitude
            }
        };
    }
    else {
        res.locals.destination = destination;
    }
    console.log("res.locals.destination im callposstack", res.locals.destination);
    next();
};
exports.callPositionstackApi = callPositionstackApi;
// to saveDestinationInDb
//# sourceMappingURL=callPositionstackApi.js.map