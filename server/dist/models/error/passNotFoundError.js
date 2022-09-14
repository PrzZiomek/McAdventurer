"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passNotFoundError = void 0;
const enums_1 = require("../enums");
const extendedError_1 = require("./extendedError");
const passNotFoundError = (desc) => new extendedError_1.ExtendedError("resource not found", enums_1.httpStatusCodes.NOT_FOUND, desc);
exports.passNotFoundError = passNotFoundError;
//# sourceMappingURL=passNotFoundError.js.map