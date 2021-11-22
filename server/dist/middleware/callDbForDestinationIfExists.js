"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callDbForDestinationIfExists = void 0;
const errorHandle_1 = require("../helpers/errorHandle");
const Destination_1 = require("../models/Destination");
const callDbForDestinationIfExists = async (req, res, next) => {
    const name = req.body.destination.name;
    //  const name = res.locals.destinationName
    let callWiki = false;
    const destinations = new Destination_1.Destinations();
    const savedAlready = await destinations.checkIfSavedAlready(name).catch(err => next((0, errorHandle_1.errorHandle)(err, 500)));
    if (savedAlready === 1) {
        const destination = await destinations.getOne(name).catch(err => next((0, errorHandle_1.errorHandle)(err, 500)));
        if (destination) {
            res.status(200).json({
                destination,
            });
        }
        callWiki = false;
    }
    ;
    if (savedAlready === 0) {
        callWiki = true;
    }
    res.locals.destinationName = req.body.destination.name;
    res.locals.callWiki = callWiki;
    next();
};
exports.callDbForDestinationIfExists = callDbForDestinationIfExists;
//# sourceMappingURL=callDbForDestinationIfExists.js.map