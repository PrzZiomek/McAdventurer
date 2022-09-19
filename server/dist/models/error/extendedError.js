"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedError = void 0;
class ExtendedError extends Error {
    constructor(name, statusCode, description) {
        super(description);
        this.name = name;
        this.statusCode = statusCode;
        this.description = description;
        if (!new.target)
            throw new Error("ExtendedError must be instantiated with new!");
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}
exports.ExtendedError = ExtendedError;
//# sourceMappingURL=extendedError.js.map