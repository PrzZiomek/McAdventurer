"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverseGeolocationRequest = void 0;
const axios_1 = __importDefault(require("axios"));
const DestinationData_1 = require("../../models/DestinationData");
const enums_1 = require("../../models/enums");
const passInternalServerError_1 = require("../../models/error/passInternalServerError");
const reverseGeolocationRequest = async (req, res, next) => {
    const { lat, lng } = req.body.coordinates;
    if (!lat && !lng)
        return;
    const params = {
        access_key: '8b7251d9992206506bbf41cdf3c3dd13',
        query: `${lat},${lng}`
    };
    const destinationData = new DestinationData_1.DestinationData();
    const destination = await destinationData.getOne(enums_1.Collection.WIKI_DESTINATIONS, { coordinates: { lat, lng } }).catch(() => next((0, passInternalServerError_1.passInternalServerError)("error when looking for destination with coords")));
    if (!destination || (destination.coordinates.lat === 0 && destination.coordinates.lng === 0)) {
        const response = await axios_1.default.get("http://api.positionstack.com/v1/reverse", { params })
            .then(res => res.data)
            .catch(() => next((0, passInternalServerError_1.passInternalServerError)("error when calling reverse api")));
        if (response && response.data) {
            const destinations = response.data.map(dest => ({
                name: dest.name,
                region: dest.region,
                county: dest.county,
                locality: dest.locality,
                country: dest.country,
                label: dest.label
            }));
            res.status(200).json({
                destinations
            });
        }
        else {
            const destination = await destinationData.getOne(enums_1.Collection.DESTINATIONS, { coordinates: { lat, lng } }).catch(() => next((0, passInternalServerError_1.passInternalServerError)("error when looking for destination with coords")));
            if (destination) {
                res.status(200).json({
                    destination
                });
            }
        }
    }
    ;
    next();
};
exports.reverseGeolocationRequest = reverseGeolocationRequest;
//# sourceMappingURL=reverseGeolocationRequest.js.map