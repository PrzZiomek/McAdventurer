"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.languagesRequest = void 0;
const errorHandle_1 = require("../helpers/errorHandle");
const Destination_1 = require("../models/Destination");
const enums_1 = require("../models/enums");
// from combinedDestinationsRequest 
const languagesRequest = async (req, res, next) => {
    const destinationList = res.locals.combinedDestsLists;
    const destination = new Destination_1.Destinations();
    const languages = await destination
        .getAll(enums_1.Table.Languages)
        .catch(err => next((0, errorHandle_1.errorHandle)(err, 500)));
    console.log("languages before send", languages);
    if (!languages) {
        return res.status(422).send({
            message: "database connection error"
        });
    }
    ;
    res.status(200).send({
        destinationList,
        languages
    });
};
exports.languagesRequest = languagesRequest;
//# sourceMappingURL=languagesRequest.js.map