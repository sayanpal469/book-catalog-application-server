"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const bookZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string({
            required_error: 'Title is required',
        }),
        author: zod_1.default.string({
            required_error: 'Author is required',
        }),
        genre: zod_1.default.string({
            required_error: 'Genre is required',
        }),
        publicationDate: zod_1.default.string({
            required_error: 'Publish date is required',
        }),
        pdf: zod_1.default.string({
            required_error: 'Pdf is required',
        }),
        description: zod_1.default.string({
            required_error: 'Pdf is required',
        }),
        reviews: zod_1.default
            .array(zod_1.default.object({
            reviewer: zod_1.default.string(),
            reviewText: zod_1.default.string(),
        }))
            .optional(),
    }),
});
exports.BookValidation = {
    bookZodSchema,
};
