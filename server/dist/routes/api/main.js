"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoutes = void 0;
const express_1 = require("express");
const destinationRequest_1 = require("../../controlers/api/destinationRequest");
const callWikiApi_1 = require("../../middleware/wikiApi/callWikiApi");
const router = (0, express_1.Router)();
router.use("/api/destination", callWikiApi_1.callWikiApi, destinationRequest_1.destinationRequest);
exports.apiRoutes = router;
//# sourceMappingURL=main.js.map