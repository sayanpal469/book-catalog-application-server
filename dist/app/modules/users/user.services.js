"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("./user.model");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.create(payload);
    if (!user) {
        throw new ApiError_1.default(http_status_codes_1.default.BAD_REQUEST, 'User not created');
    }
    return user;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (!user) {
        throw new ApiError_1.default(http_status_codes_1.default.NOT_FOUND, 'This email does not exists');
    }
    else {
        if (user.password == payload.password) {
            return user;
        }
        else {
            throw new ApiError_1.default(http_status_codes_1.default.UNAUTHORIZED, 'Wrong password');
        }
    }
});
const forgotPassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: email });
    if (!user) {
        throw new ApiError_1.default(http_status_codes_1.default.NOT_FOUND, 'This email does not exists');
    }
    else {
        yield user_model_1.User.findOneAndUpdate({
            email: email,
        }, {
            password: password,
        });
    }
    return user;
});
exports.UserService = {
    createUser,
    loginUser,
    forgotPassword,
};
