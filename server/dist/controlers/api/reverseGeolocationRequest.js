"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverseGeolocationRequest = void 0;
const axios_1 = __importDefault(require("axios"));
const errorHandle_1 = require("../../helpers/errorHandle");
const Destination_1 = require("../../models/Destination");
const reverseGeolocationRequest = async (req, res, next) => {
    const coordinates = req.body.coordinates;
    const destinations = new Destination_1.Destinations();
    const params = {
        access_key: '8b7251d9992206506bbf41cdf3c3dd13',
        query: `${coordinates.lat},${coordinates.lng}` // `51.507822,-0.076702`
    };
    let destination = await destinations
        .getOne(coordinates, "destination")
        .catch(err => next((0, errorHandle_1.errorHandle)(err, 500)));
    if (!destination) {
        destination = await destinations
            .getOne(coordinates, "destinations_list")
            .catch(err => next((0, errorHandle_1.errorHandle)(err, 500)));
    }
    if (!destination || destination.LAT === "unset") {
        destination = await axios_1.default.get("http://api.positionstack.com/v1/reverse", { params })
            .catch(err => next((0, errorHandle_1.errorHandle)(err, 500)));
    }
    console.log("reverseGeoRes!!!. ", destination);
    if (destination) {
        res.status(200).json({
            destination: {
                name: destination.NAME,
                content: destination === null || destination === void 0 ? void 0 : destination.CONTENT,
                coordinates: {
                    lat: destination === null || destination === void 0 ? void 0 : destination.LAT,
                    lng: destination === null || destination === void 0 ? void 0 : destination.LNG
                },
                images: destination === null || destination === void 0 ? void 0 : destination.IMAGES
            },
        });
    }
    res.locals.coordinates = coordinates;
    next();
};
exports.reverseGeolocationRequest = reverseGeolocationRequest;
//# sourceMappingURL=reverseGeolocationRequest.js.map