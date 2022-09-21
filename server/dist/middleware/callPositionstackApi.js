"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callPositionstackApi = void 0;
const axios_1 = __importDefault(require("axios"));
const passInternalServerError_1 = require("../models/error/passInternalServerError");
const callPositionstackApi = async (req, res, next) => {
    const destination = res.locals.destination;
    /*  const hasDestinationCoords: boolean = (destination.coordinates?.lat !== "unset" ||
         !destination.coordinates?.lat) ||
         (destination.coordinates?.lng !== "unset" || !destination.coordinates?.lng);
   */
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
    next();
};
exports.callPositionstackApi = callPositionstackApi;
// to saveDestinationInDb
//# sourceMappingURL=callPositionstackApi.js.map