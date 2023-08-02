"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const handelValidationError = (err) => {
    const errors = Object.values(err.errors).map(element => {
        return {
            path: element === null || element === void 0 ? void 0 : element.path,
            message: element === null || element === void 0 ? void 0 : element.message,
        };
    });
    const statusCode = http_status_codes_1.default.BAD_REQUEST;
    return {
        statusCode,
        message: 'Validation Error',
        errorMessages: errors,
    };
};
exports.default = handelValidationError;
