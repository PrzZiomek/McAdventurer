"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passInternalServerError = void 0;
const enums_1 = require("../enums");
const extendedError_1 = require("./extendedError");
const passInternalServerError = (desc) => new extendedError_1.ExtendedError("internal server error", enums_1.httpStatusCodes.INTERNAL_SERVER, desc);
exports.passInternalServerError = passInternalServerError;
//# sourceMappingURL=passInternalServerError.js.map