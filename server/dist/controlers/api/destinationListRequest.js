"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destinationListRequest = void 0;
const Destination_1 = require("../../models/Destination");
const enums_1 = require("../../models/enums");
const destinationListRequest = async (req, res, next) => {
    const destinations = new Destination_1.Destinations();
    const dbRes = await destinations.getAll(enums_1.Table.Destinations_list);
    if (!dbRes) {
        return res.status(422).send({
            message: "database connection error"
        });
    }
    res.status(200).send(dbRes);
    console.log(dbRes);
};
exports.destinationListRequest = destinationListRequest;
//# sourceMappingURL=destinationListRequest.js.map