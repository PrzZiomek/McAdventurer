"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandle = void 0;
const extendedError_1 = require("../models/extendedError");
const errorHandle = (err, statusCode) => {
    const error = new extendedError_1.ExtendedError(err);
    error.httpStatusCode = statusCode;
    return error;
};
exports.errorHandle = errorHandle;
//# sourceMappingURL=errorHandle.js.map