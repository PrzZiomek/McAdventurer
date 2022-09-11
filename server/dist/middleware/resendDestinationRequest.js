"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendDestinationRequest = void 0;
const errorHandle_1 = require("../helpers/errorHandle");
const Destination_1 = require("../models/Destination");
const resendDestinationRequest = async (req, res, next) => {
    const destinations = new Destination_1.Destinations();
    const name = req.query.name;
    const destination = await destinations
        .getOne(name)
        .catch(err => next((0, errorHandle_1.errorHandle)(err, 500)));
    console.log("destination second time!", destination);
    if (destination) {
        res.status(200).json({
            destination: {
                name: destination.NAME,
                content: destination.CONTENT,
                coordinates: {
                    lat: destination.LAT,
                    lng: destination.LNG
                },
            },
        });
    }
    else {
        return res.status(422).send({
            message: "database error"
        });
    }
    ;
    next();
};
exports.resendDestinationRequest = resendDestinationRequest;
//# sourceMappingURL=resendDestinationRequest.js.map