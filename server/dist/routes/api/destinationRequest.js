"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destinationRequest = void 0;
const destinationRequest = (req, res) => {
    const reqBody = req.body;
    console.log(reqBody);
    res.status(200).json({
        message: "ponggg",
    });
};
exports.destinationRequest = destinationRequest;
//# sourceMappingURL=destinationRequest.js.map