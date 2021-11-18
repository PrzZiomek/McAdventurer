"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destinationRequest = void 0;
const destinationRequest = (req, res, next) => {
    const reqBody = req.body;
    res.status(200).json({
        message: "ponggg",
    });
    res.locals.destinationName = reqBody.destination.name;
    next();
};
exports.destinationRequest = destinationRequest;
//# sourceMappingURL=destinationRequest.js.map