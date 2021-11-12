"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoutes = void 0;
const express_1 = require("express");
const destinationRequest_1 = require("./destinationRequest");
const router = (0, express_1.Router)();
router.post("api/destination", destinationRequest_1.destinationRequest);
exports.apiRoutes = router;
//# sourceMappingURL=main.js.map