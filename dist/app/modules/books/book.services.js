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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const book_model_1 = require("./book.model");
const book_constant_1 = require("./book.constant");
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.create(payload);
    if (!book) {
        throw new ApiError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Book not created');
    }
    return book;
});
const getAllBook = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, genre, publicationYear } = filters, filtersData = __rest(filters, ["searchTerm", "genre", "publicationYear"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: book_constant_1.bookSearchbleFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (genre) {
        andConditions.push({ genre: { $in: [genre] } });
    }
    if (publicationYear) {
        andConditions.push({ publicationYear: { $in: [publicationYear] } });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const books = yield book_model_1.Book.find(whereConditions);
    const total = yield book_model_1.Book.countDocuments();
    if (!books.length) {
        throw new ApiError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Book not found');
    }
    return {
        meta: {
            total,
        },
        data: books,
    };
});
const getSingelBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(payload);
    if (!book) {
        throw new ApiError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Book not found');
    }
    return book;
});
const updateBook = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findOneAndUpdate({ _id: id }, data, { new: true });
    if (!book) {
        throw new ApiError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Book not found');
    }
    return book;
});
const deleteBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findOneAndDelete({ _id: payload });
    if (!book) {
        throw new ApiError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Book not found');
    }
    return book;
});
exports.BookService = {
    createBook,
    getAllBook,
    getSingelBook,
    updateBook,
    deleteBook,
};
