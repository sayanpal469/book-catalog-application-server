"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = require("../modules/users/user.router");
const book_router_1 = require("../modules/books/book.router");
const routes = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/',
        route: user_router_1.UserRoutes,
    },
    {
        path: '/books',
        route: book_router_1.BookRoutes,
    },
];
moduleRoutes.forEach(route => routes.use(route.path, route.route));
exports.default = routes;
