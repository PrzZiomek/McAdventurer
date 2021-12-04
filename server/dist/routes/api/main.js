"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoutes = void 0;
const express_1 = require("express");
const destinationRequest_1 = require("../../controlers/api/destinationRequest");
const saveDestinationInDb_1 = require("../../middleware/saveDestinationInDb");
const callWikiApi_1 = require("../../middleware/wikiApi/callWikiApi");
const router = (0, express_1.Router)();
router.post("/api/destination", destinationRequest_1.destinationRequest, callWikiApi_1.callWikiApi, saveDestinationInDb_1.saveDestinationInDb);
exports.apiRoutes = router;
//# sourceMappingURL=main.js.map