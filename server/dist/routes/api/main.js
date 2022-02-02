"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoutes = void 0;
const express_1 = require("express");
const destinationListRequest_1 = require("../../controlers/api/destinationListRequest");
const destinationRequest_1 = require("../../controlers/api/destinationRequest");
const combinedDestinationsListsRequest_1 = require("../../middleware/combinedDestinationsListsRequest");
const saveDestinationInDb_1 = require("../../middleware/saveDestinationInDb");
const callWikiApi_1 = require("../../middleware/wikiApi/callWikiApi");
const router = (0, express_1.Router)();
router.post("/api/destinationsList", destinationListRequest_1.destinationListRequest, combinedDestinationsListsRequest_1.combinedDestinationsRequest);
router.post("/api/destination", destinationRequest_1.destinationRequest, callWikiApi_1.callWikiApi, saveDestinationInDb_1.saveDestinationInDb);
exports.apiRoutes = router;
//# sourceMappingURL=main.js.map