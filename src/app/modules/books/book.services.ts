import ApiError from '../../../errors/ApiError';
import http from 'http-status-codes';
import { IBook, IBookFilters } from './book.interface';
import { Book } from './book.model';
import { bookSearchbleFields } from './book.constant';
import { IGenericResponse } from '../../../types/common';

const createBook = async (payload: IBook): Promise<IBook | null> => {
  const book = await Book.create(payload);

  if (!book) {
    throw new ApiError(http.BAD_REQUEST, 'Book not created');
  }

  return book;
};

const getAllBook = async (
  filters: IBookFilters,
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, genre, publicationYear, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchbleFields.map(field => ({
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

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const books = await Book.find(whereConditions);
  const total = await Book.countDocuments();

  if (!books.length) {
    throw new ApiError(http.BAD_REQUEST, 'Book not found');
  }

  return {
    meta: {
      total,
    },
    data: books,
  };
};

const getSingelBook = async (payload: string): Promise<IBook | null> => {
  const book = await Book.findById(payload);

  if (!book) {
    throw new ApiError(http.BAD_REQUEST, 'Book not found');
  }

  return book;
};

const updateBook = async (
  id: string,
  data: Partial<IBook>,
): Promise<IBook | null> => {
  const book = await Book.findOneAndUpdate({ _id: id }, data, { new: true });

  if (!book) {
    throw new ApiError(http.BAD_REQUEST, 'Book not found');
  }

  return book;
};

const deleteBook = async (payload: string): Promise<IBook | null> => {
  const book = await Book.findOneAndDelete({ _id: payload });

  if (!book) {
    throw new ApiError(http.BAD_REQUEST, 'Book not found');
  }

  return book;
};

export const BookService = {
  createBook,
  getAllBook,
  getSingelBook,
  updateBook,
  deleteBook,
};
