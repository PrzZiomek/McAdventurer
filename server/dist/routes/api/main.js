"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoutes = void 0;
const express_1 = require("express");
const destinationListRequest_1 = require("../../controlers/api/destinationListRequest");
const destinationRequest_1 = require("../../controlers/api/destinationRequest");
const reverseGeolocationRequest_1 = require("../../controlers/api/reverseGeolocationRequest");
const callPositionstackApi_1 = require("../../middleware/callPositionstackApi");
const combinedDestinationsListsRequest_1 = require("../../middleware/combinedDestinationsListsRequest");
const languagesRequest_1 = require("../../middleware/languagesRequest");
const saveDestinationInDb_1 = require("../../middleware/saveDestinationInDb");
const callWikiApi_1 = require("../../middleware/wikiApi/callWikiApi");
const router = (0, express_1.Router)();
router.post("/api/destinationsList", destinationListRequest_1.destinationListRequest, combinedDestinationsListsRequest_1.combinedDestinationsRequest, languagesRequest_1.languagesRequest);
router.post("/api/destination", destinationRequest_1.destinationRequest, callWikiApi_1.callWikiApi, callPositionstackApi_1.callPositionstackApi, saveDestinationInDb_1.saveDestinationInDb);
router.post("/api/destination-clicked", reverseGeolocationRequest_1.reverseGeolocationRequest);
exports.apiRoutes = router;
//# sourceMappingURL=main.js.map