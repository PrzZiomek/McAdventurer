"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callPositionstackApi = void 0;
const axios_1 = __importDefault(require("axios"));
const errorHandle_1 = require("../helpers/errorHandle");
const callPositionstackApi = async (req, res, next) => {
    const destination = res.locals.destination;
    const hasDestinationCoords = destination.coordinates.lat !== "unset" || destination.coordinates.lng !== "unset";
    if (!hasDestinationCoords) {
        const params = {
            access_key: '8b7251d9992206506bbf41cdf3c3dd13',
            query: destination.name
        };
        const destinationRes = await axios_1.default.get("http://api.positionstack.com/v1/forward", { params })
            .catch(err => next((0, errorHandle_1.errorHandle)(err, 500)));
        if (!destinationRes.data)
            return;
        const firstDest = destinationRes.data.data[0]; // to do - support of multiple same name destinations handling!
        res.locals.destination = {
            content: `${firstDest.region}, ${firstDest.county}`,
            name: firstDest.name,
            coordinates: {
                lat: firstDest.latitude,
                lng: firstDest.longitude
            }
        };
        next();
    }
    else {
        res.locals.destination = destination;
        next();
    }
};
exports.callPositionstackApi = callPositionstackApi;
//# sourceMappingURL=callPositionstackApi.js.map