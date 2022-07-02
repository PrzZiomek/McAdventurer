"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destinationListRequest = void 0;
const errorHandle_1 = require("../../helpers/errorHandle");
const Destination_1 = require("../../models/Destination");
const enums_1 = require("../../models/enums");
const destinationListRequest = async (req, res, next) => {
    const destination = new Destination_1.Destinations();
    const allDestination = await destination
        .getAll(enums_1.Table.Destinations_list)
        .catch(err => next((0, errorHandle_1.errorHandle)(err, 500)));
    // console.log("destinationListRequest", allDestination );
    if (!allDestination) {
        return res.status(422).send({
            message: "database connection error"
        });
    }
    res.locals.destinationsList = allDestination;
    next();
};
exports.destinationListRequest = destinationListRequest;
// next to combinedDestinationsRequest
//# sourceMappingURL=destinationListRequest.js.map