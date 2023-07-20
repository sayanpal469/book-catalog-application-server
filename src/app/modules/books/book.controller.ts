import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { BookService } from './book.services';
import sendResponse from '../../../shared/sendResponse';
import { IBook, IReview } from './book.interface';
import http from 'http-status-codes';
import { bookFilterableFields, bookSearchbleFields } from './book.constant';
import pick from '../../../shared/pick';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const reviews: IReview[] = [];

  if (req.body.reviewer && req.body.reviewText) {
    for (const review of reviews) {
      const { reviewText, reviewer } = review;
      reviews.push({ reviewer, reviewText });
    }
  }

  const result = await BookService.createBook({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    publicationDate: req.body.publicationDate,
    // pdf: req.file?.filename,
    pdf: req.body.pdf,
    reviews: req.body.reviews,
  });

  sendResponse<IBook>(res, {
    statusCode: http.OK,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});

const getAllBook = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const searchTerm = req.query.searchTerm?.toString();

  if (searchTerm && bookSearchbleFields.includes(searchTerm)) {
    filters.searchTerm = searchTerm;
  }

  const result = await BookService.getAllBook(filters);

  sendResponse<IBook[]>(res, {
    statusCode: http.OK,
    success: true,
    message: 'Books retrieve successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingelBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getSingelBook(req.params.id);

  sendResponse<IBook>(res, {
    statusCode: http.OK,
    success: true,
    message: 'Book retrieve successfully',
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.updateBook(req.params.id, req.body);

  sendResponse<IBook>(res, {
    statusCode: http.OK,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  await BookService.deleteBook(req.params.id);

  sendResponse<IBook>(res, {
    statusCode: http.OK,
    success: true,
    message: 'Book deleted successfully',
  });
});

export const BookController = {
  createBook,
  getAllBook,
  getSingelBook,
  updateBook,
  deleteBook,
};
