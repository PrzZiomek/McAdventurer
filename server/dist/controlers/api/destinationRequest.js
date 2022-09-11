"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destinationRequest = void 0;
const errorHandle_1 = require("../../helpers/errorHandle");
const enums_1 = require("../../models/enums");
const getCollection_1 = require("../../mongoDB/utils/getCollection");
const destinationRequest = async (req, res, next) => {
    const name = req.body.destination.name.trim();
    let callWiki = false;
    const destsColl = await (0, getCollection_1.getCollection)(enums_1.Collection.WikiDestinations);
    const destination = await destsColl.findOne({ name }).catch(err => (0, errorHandle_1.errorHandle)(err, 500));
    console.log("name", name);
    console.log("destination req", destination);
    if (destination) {
        res.status(200).json({
            destination: {
                name: destination.name,
                content: destination.content,
                coordinates: {
                    lat: destination.lat,
                    lng: destination.lng
                },
                images: destination.images
            },
        });
    }
    if (!destination) {
        callWiki = true;
    }
    res.locals.destinationName = req.body.destination.name;
    res.locals.callWiki = callWiki;
    next();
};
exports.destinationRequest = destinationRequest;
// next to callWikiApi
//# sourceMappingURL=destinationRequest.js.map